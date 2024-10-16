import { ReactNode } from 'react'
import { Box } from '@fower/react'
import { NavType, useNav } from '../../hooks/useNav'

interface SidebarNavProps {
  icon: ReactNode
  type: NavType
}

export const SidebarNav = ({ icon, type }: SidebarNavProps) => {
  const { nav, setNav, getText } = useNav()
  return (
    <Box
      toCenterY
      gap2
      bgNeutral200--hover
      bgNeutral200={nav === type}
      rounded
      px2
      py2
      transitionCommon
      cursorPointer
      onClick={() => setNav(type)}
    >
      <Box inlineFlex neutral600>
        {icon}
      </Box>
      <Box textBase zinc700>
        {getText(type)}
      </Box>
    </Box>
  )
}
