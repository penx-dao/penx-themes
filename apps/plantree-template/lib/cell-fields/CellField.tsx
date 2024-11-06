import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { db } from '@/lib/local-db'
import { FieldType, ICellNode, IColumnNode } from '@/lib/model'
import { store } from '@/store'
import { CreatedAtCell } from './fields/CreatedAt'
import { DateCell } from './fields/Date'
import { MultipleSelectCell } from './fields/MultipleSelect'
import { NumberCell } from './fields/Number'
import { PasswordCell } from './fields/Password'
import { SingleSelectCell } from './fields/SingleSelect'
import { TextCell } from './fields/Text'
import { UpdatedAtCell } from './fields/UpdatedAt'

const cellsMap: Record<string, any> = {
  [FieldType.TEXT]: TextCell,
  [FieldType.NUMBER]: NumberCell,
  [FieldType.PASSWORD]: PasswordCell,
  [FieldType.SINGLE_SELECT]: SingleSelectCell,
  [FieldType.MULTIPLE_SELECT]: MultipleSelectCell,
  [FieldType.DATE]: DateCell,
  [FieldType.CREATED_AT]: CreatedAtCell,
  [FieldType.UPDATED_AT]: UpdatedAtCell,
}

interface Props {
  index: number
  columns: IColumnNode[]
  cell: ICellNode
}

export const CellField = memo(
  function TableCell({ columns, cell, index }: Props) {
    const { rowId, columnId } = cell.props
    const column = columns.find((c) => c.id === columnId)!
    const fieldType = column.props.fieldType
    const CellComponent = cellsMap[fieldType as FieldType] || TextCell

    async function updateCell(data: any) {
      await db.updateNode(cell.id, {
        props: { ...cell.props, data },
      })

      const nodes = await db.listNodesByUserId()
      store.node.setNodes(nodes)
    }

    return (
      <CellComponent
        cell={cell}
        updateCell={updateCell}
        index={index}
        column={column}
      />
    )
  },
  (prev, next) => {
    return isEqual({ cell: prev.cell }, { cell: next.cell })
  },
)
