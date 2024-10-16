import { Box } from '@fower/react'
import { ChevronDown, Plus } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  Button,
  Menu,
  MenuItem,
  modalController,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from 'uikit'
import { ModalNames } from '@plantreexyz/constants'
import { useSelectedTreeName, useTrees } from '@plantreexyz/hooks'
import { AppService } from '@plantreexyz/service'
import { selectedTreeNameAtom, store } from '@plantreexyz/store'

export function SpacesPopover() {
  const { trees } = useTrees()
  const { selectedName } = useSelectedTreeName()

  const tree = trees.find((t) => t.name === selectedName)!

  return (
    <Popover>
      <PopoverTrigger
        toCenterY
        gap1
        cursorPointer
        bgNeutral200--hover
        roundedLG
        w-100p
        transitionColors
        h-36
        py3
        px2
      >
        <Avatar size={20} roundedXL>
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <Box textXL>{tree?.name}</Box>
        <Box inlineFlex mb--4 neutral500>
          <ChevronDown size={16} />
        </Box>
      </PopoverTrigger>
      <PopoverContent w-200>
        <Menu>
          {trees.map((tree) => (
            <PopoverClose asChild key={tree.name}>
              <MenuItem
                onClick={async () => {
                  const appService = new AppService()
                  await appService.reloadPosts(tree.name)
                  store.set(selectedTreeNameAtom, tree.name)
                }}
              >
                {tree.name}
              </MenuItem>
            </PopoverClose>
          ))}

          <MenuItem
            gap1
            onClick={async () => {
              modalController.open(ModalNames.CREATE_SPACE)
            }}
          >
            <Plus size={18}></Plus>
            <Box>Create a tree</Box>
          </MenuItem>
        </Menu>
      </PopoverContent>
    </Popover>
  )
}
