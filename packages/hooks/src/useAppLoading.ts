import { useAtom } from 'jotai'
import { appLoadingAtom } from '@plantreexyz/store'

export function useAppLoading() {
  const [loading, setLoading] = useAtom(appLoadingAtom)
  return { loading, setLoading }
}
