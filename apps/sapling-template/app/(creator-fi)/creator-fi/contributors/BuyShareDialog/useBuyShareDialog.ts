import { atom, useAtom } from 'jotai'

const buyShareDialog = atom<boolean>(false)

export function useBuyShareDialog() {
  const [isOpen, setIsOpen] = useAtom(buyShareDialog)
  return { isOpen, setIsOpen }
}
