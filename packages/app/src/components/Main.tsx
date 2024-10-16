import { Box } from '@fower/react'
import { invoke } from '@tauri-apps/api/core'
import { resolve } from '@tauri-apps/api/path'
import { Command } from '@tauri-apps/plugin-shell'
import { Globe } from 'lucide-react'
import { Button, modalController } from 'uikit'
import { ModalNames } from '@plantreexyz/constants'
import { useTrees } from '@plantreexyz/hooks'
import { NavType, useNav } from '../hooks/useNav'
import { CreatePostButton } from './CreatePostButton'
import { DomainsModal } from './DomainsModal/DomainsModal'
import { ModeToggle } from './ModeToggle/ModeToggle'
import { Posts } from './Posts/Posts'
import { Settings } from './Settings/Settings'
import { Tags } from './Tags/Tags'
import { Themes } from './Themes/Themes'

export const Main = () => {
  const { nav, getText } = useNav()
  const { activeTree } = useTrees()
  return (
    <Box column flex-1 h-100vh toBetween pb-8 px2>
      <DomainsModal />
      <Box data-tauri-drag-region h-48 toCenterY toBetween>
        <Box data-tauri-drag-region fontBold>
          {getText(nav)}
        </Box>

        <Box data-tauri-drag-region flex-1 h-100p></Box>
        <Box toCenterY gap1>
          <Box
            flexShrink-0
            roundedFull
            bgGray200--hover
            square7
            cursorPointer
            neutral600
            toCenter
            onClick={() => {
              modalController.open(ModalNames.DOMAINS)
            }}
          >
            <Globe size={18} />
          </Box>

          <ModeToggle />

          <Button
            size="sm"
            variant="outline"
            colorScheme="black"
            onClick={async () => {
              console.log('clicked!')

              // let result = await Command.create('exec-sh', [
              //   '-c',
              //   "echo 'Hello World!'",
              // ]).execute()
              // console.log(result)

              const treePath = await resolve(
                activeTree.treeRootDir,
                activeTree.name,
              )

              let result = await Command.create('exec-sh', [
                '-c',
                `cd ${treePath} && npm run dev`,
              ]).execute()
              console.log(result)
            }}
          >
            Start
          </Button>

          <Button
            size="sm"
            colorScheme="black"
            onClick={async () => {
              console.log('kill!')

              let result = await invoke('kill_port', {
                port: 4321,
              })

              console.log(result)
            }}
          >
            Stop
          </Button>

          <CreatePostButton />
        </Box>
      </Box>
      <Box bgWhite p4 roundedXL shadowSM h="calc(100vh - 50px)">
        {nav === NavType.POSTS && <Posts />}
        {nav === NavType.TAGS && <Tags />}
        {nav === NavType.SETTINGS && <Settings />}
        {nav === NavType.THEMES && <Themes />}
      </Box>
    </Box>
  )
}
