import { Box } from '@fower/react'
import { Settings, ShirtIcon, TagIcon, TextIcon } from 'lucide-react'
import { useTrees } from '@plantreexyz/hooks'
import { NavType } from '../../hooks/useNav'
import { CreateSpaceModal } from '../CreateSpaceModal/CreateSpaceModal'
import { SpacesPopover } from '../SpacesPopover/SpacesPopover'
import MacTitlebar from './MacTitlebar'
import { PublishButton } from './PublishButton'
import { SidebarNav } from './SidebarNav'

export const Sidebar = () => {
  return (
    <Box h-100vh column gap1 w-240>
      <CreateSpaceModal />
      <Box column toLeft pt4 px3 data-tauri-drag-region gap2>
        <MacTitlebar />
        <SpacesPopover />
      </Box>
      <Box column gap-1 flex-1 p3>
        <SidebarNav type={NavType.POSTS} icon={<TextIcon size={16} />} />
        <SidebarNav type={NavType.TAGS} icon={<TagIcon size={16} />} />
        <SidebarNav type={NavType.THEMES} icon={<ShirtIcon size={16} />} />
        <SidebarNav type={NavType.SETTINGS} icon={<Settings size={16} />} />
      </Box>

      <Box p3 w-100p>
        <PublishButton />
      </Box>
    </Box>
  )
}
