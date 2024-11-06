import { Quote } from 'lucide-react'
import { ELEMENT_BLOCKQUOTE } from '@/lib/constants'
import { ExtensionContext } from '@/lib/extension-typings'
import { Blockquote } from './BlockQuote'

export { ELEMENT_BLOCKQUOTE }

export * from './types'

export function activate(ctx: ExtensionContext) {
  ctx.registerBlock({
    elements: [
      {
        type: ELEMENT_BLOCKQUOTE,
        component: Blockquote,
        // slashCommand: {
        //   name: 'Blockquote',
        //   icon: Quote,
        // },
      },
    ],
    autoformatRules: [
      {
        mode: 'block',
        type: ELEMENT_BLOCKQUOTE,
        match: '> ',
      },
    ],
  })
}
