import { useAtomValue } from 'jotai'
import { routerAtom } from '@plantreexyz/store'

export function useRouter() {
  const router = useAtomValue(routerAtom)
  return {
    ...router,
    isPost: router.name === 'POST',
    postFileName: router.params?.fileName || '',
  }
}
