import { atom, useAtom } from 'jotai'

const addVestingDialog = atom<boolean>(false)

export function useAddVestingDialog() {
  const [isOpen, setIsOpen] = useAtom(addVestingDialog)
  return { isOpen, setIsOpen }
}
