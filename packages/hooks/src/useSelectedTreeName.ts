import { useAtom } from 'jotai'
import { selectedTreeNameAtom } from '@plantreexyz/store'

export function useSelectedTreeName() {
  const [selectedName, setSelectedName] = useAtom(selectedTreeNameAtom)
  return { selectedName, setSelectedName }
}
