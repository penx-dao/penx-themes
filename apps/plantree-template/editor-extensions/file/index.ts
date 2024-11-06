import { Paperclip } from 'lucide-react'
import { ELEMENT_FILE } from '@/lib/constants'
import { ExtensionContext } from '@/lib/extension-typings'
import { File } from './ui/File'

export function activate(ctx: ExtensionContext) {
  ctx.registerBlock({
    elements: [
      {
        isVoid: true,
        type: ELEMENT_FILE,
        component: File,
        // slashCommand: {
        //   name: 'File',
        //   icon: Paperclip,
        // },
      },
    ],
  })
}
