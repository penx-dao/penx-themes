import { Text } from 'lucide-react'
import { ELEMENT_P } from '@/lib/constants'
import { ExtensionContext } from '@/lib/extension-typings'
import { getEmptyParagraph } from './getEmptyParagraph'
import { insertEmptyParagraph } from './insertEmptyParagraph'
import { Paragraph } from './Paragraph'

export function activate(ctx: ExtensionContext) {
  ctx.registerBlock({
    elements: [
      {
        type: ELEMENT_P,
        component: Paragraph,
        // placeholder: "Type '/' to browse options",
        placeholder: '',
        slashCommand: {
          in: ['BLOCK', 'OUTLINER'],
          name: 'Text',
          icon: Text,
        },
      },
    ],
  })
}

export * from './types'
export * from './isParagraph'

export { Paragraph, insertEmptyParagraph, getEmptyParagraph }
