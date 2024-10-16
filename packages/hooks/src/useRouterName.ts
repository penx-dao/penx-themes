import { useAtomValue } from 'jotai'
import { routerAtom } from '@plantreexyz/store'

export function useRouterName() {
  const { name } = useAtomValue(routerAtom)
  return name
}
