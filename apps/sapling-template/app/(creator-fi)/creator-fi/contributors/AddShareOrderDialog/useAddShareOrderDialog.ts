import { atom, useAtom } from 'jotai'

const addShareOrderDialog = atom<boolean>(false)

export function useAddShareOrderDialog() {
  const [isOpen, setIsOpen] = useAtom(addShareOrderDialog)
  return { isOpen, setIsOpen }
}
