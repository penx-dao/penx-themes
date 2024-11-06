import { Bullet } from '@/components/Bullet'
import { EditorMode } from '@/lib/constants'
import { ICellNode, IColumnNode, Node as NodeModel } from '@/lib/model'
import { NodeService } from '@/lib/service'
import { store } from '@/store'

import {
  CustomCell,
  CustomRenderer,
  drawTextCell,
  GridCellKind,
} from '@glideapps/glide-data-grid'
import { produce } from 'immer'
import { Node } from 'slate'
import { PrimaryCell } from '../../../Cell/PrimaryCell'

interface NoteCellProps {
  kind: 'note-cell'
  data: ICellNode
  column: IColumnNode
}

export type NoteCell = CustomCell<NoteCellProps>

const getTextFromChildren = (children: any[], renderTag: boolean) => {
  if (!renderTag) {
    const notRenderTagChildren = children.filter(
      (item: any) => item?.type !== 'tag',
    ) as { text: string; type?: string }[]
    return notRenderTagChildren.map((item) => item.text).join('')
  }

  return children.reduce((acc: string, child: any) => {
    if (child?.type === 'tag') {
      return acc + ('#' + child?.name || '')
    }
    return acc + Node.string(child)
  }, '')
}

export const generateNoteCellText = (ref: string, renderTag = true): string => {
  const node = store.node.getNode(ref)

  if (!node?.element) {
    return 'EMPTY'
  }

  const elements = Array.isArray(node.element) ? node.element : [node.element]

  const text = elements
    .map((element: any) => {
      if (Array.isArray(element.children)) {
        return getTextFromChildren(element.children, renderTag)
      } else {
        return Node.string(element)
      }
    })
    .join('')

  return text
}

export const noteCellRenderer: CustomRenderer<NoteCell> = {
  kind: GridCellKind.Custom,
  isMatch: (c): c is NoteCell => (c.data as any).kind === 'note-cell',
  draw: (args, cell) => {
    const cellNode = cell.data.data
    const { ref } = cellNode.props
    const text = generateNoteCellText(ref)
    drawTextCell(args, text)

    return true
  },
  provideEditor: () => ({
    editor: (p) => {
      const { value, onChange, onFinishedEditing } = p
      const { column, data: cellNode } = value.data
      let newValue = value

      async function clickBullet() {
        //
      }
      return (
        <div className="flex items-center w-[300px]">
          <Bullet
            outlineColor="transparent"
            style={{
              flexShrink: 0,
            }}
            onClick={(e) => {
              e.stopPropagation()
              clickBullet()
            }}
          />
          <PrimaryCell
            index={0}
            cell={cellNode}
            column={column}
            width={0}
            onChange={(element) => {
              let newElement = Array.isArray(element) ? element : [element]

              const newValue = produce(value, (draft) => {
                try {
                  draft.data.data.element = newElement
                } catch (error) {}
              })

              onChange(newValue)
            }}
            onBlur={() => {
              onFinishedEditing(newValue)
            }}
            selected={false}
            updateCell={() => {}}
          />
        </div>
      )
    },
  }),
}
