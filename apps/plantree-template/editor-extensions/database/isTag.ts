import { ELEMENT_TAG } from '@/lib/constants'
import { TagSelectorElement } from './types'

export function isTag(node: any): node is TagSelectorElement {
  return node?.type === ELEMENT_TAG
}
