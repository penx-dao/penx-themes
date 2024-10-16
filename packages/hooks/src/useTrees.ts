import { useAtom } from 'jotai'
import { treesAtom } from '@plantreexyz/store'
import { useSelectedTreeName } from './useSelectedTreeName'

export function useTrees() {
  const { selectedName } = useSelectedTreeName()
  const [trees, setTrees] = useAtom(treesAtom)
  return {
    trees,
    activeTree: trees.find((t) => t.name === selectedName)!,
    setTrees,
  }
}
