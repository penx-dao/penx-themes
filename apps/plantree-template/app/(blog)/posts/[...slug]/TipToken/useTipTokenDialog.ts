import { atom, useAtom } from 'jotai'

const tipTokenDialogAtom = atom<boolean>(false)

export function useTipTokenDialog() {
  const [isOpen, setIsOpen] = useAtom(tipTokenDialogAtom)
  return { isOpen, setIsOpen }
}
