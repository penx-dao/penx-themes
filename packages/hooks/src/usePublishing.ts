import { useAtom } from 'jotai'
import { publishingAtom } from '@plantreexyz/store'

export function usePublishing() {
  const [publishing, setPublishing] = useAtom(publishingAtom)
  return { publishing, setPublishing }
}
