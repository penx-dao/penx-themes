import { ELEMENT_TAG_SELECTOR } from '@/lib/constants'
import { TagSelectorElement } from './types'

export function isTagSelector(node: any): node is TagSelectorElement {
  return node?.type === ELEMENT_TAG_SELECTOR
}
