import { Minus } from 'lucide-react'
import { ELEMENT_HR } from '@/lib/constants'
import { setNodes } from '@/lib/editor-transforms'
import { ExtensionContext } from '@/lib/extension-typings'
import { insertEmptyParagraph } from '@/editor-extensions/paragraph'
import { Divider } from './Divider'
import { DividerElement } from './types'

export function activate(ctx: ExtensionContext) {
  ctx.registerBlock({
    elements: [
      {
        isVoid: true,
        type: ELEMENT_HR,
        component: Divider,
        slashCommand: {
          // in: ['BLOCK'],
          in: [],
          name: 'Divider',
          icon: Minus,
          afterInvokeCommand(editor) {
            insertEmptyParagraph(editor)
          },
        },
      },
    ],
    autoformatRules: [
      {
        mode: 'block',
        type: ELEMENT_HR,
        match: '---',
        format: (editor) => {
          setNodes<DividerElement>(editor, { type: ELEMENT_HR })
          // insertEmptyParagraph(editor)
        },
      },
    ],
  })
}
