import { Contributor } from '@/lib/types'
import { atom, useAtom } from 'jotai'

const giveShareDialogAtom = atom({
  contributor: null as any as Contributor,

  isOpen: false,
})

export function useGiveShareDialog() {
  const [state, setState] = useAtom(giveShareDialogAtom)
  return {
    ...state,
    setState,
    setIsOpen: (isOpen: boolean) => setState((s) => ({ ...s, isOpen })),
  }
}
