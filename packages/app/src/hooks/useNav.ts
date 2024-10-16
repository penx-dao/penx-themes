import { atom, useAtom } from 'jotai'

export enum NavType {
  POSTS,
  TAGS,
  THEMES,
  SETTINGS,
}

const textMap: Record<NavType, string> = {
  [NavType.POSTS]: 'Posts',
  [NavType.TAGS]: 'Tags',
  [NavType.THEMES]: 'Themes',
  [NavType.SETTINGS]: 'Settings',
}

export const navAtom = atom(NavType.POSTS)

export function useNav() {
  const [nav, setNav] = useAtom<NavType>(navAtom)

  return {
    nav,
    getText: (type: NavType) => textMap[type],
    setNav,
  }
}
