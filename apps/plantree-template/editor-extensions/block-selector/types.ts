import { BaseElement } from 'slate'
import { ELEMENT_BLOCK_SELECTOR } from '@/lib/constants'

export interface BlockSelectorElement extends BaseElement {
  id?: string
  type: typeof ELEMENT_BLOCK_SELECTOR
  isOpen: boolean
  trigger: string
}
