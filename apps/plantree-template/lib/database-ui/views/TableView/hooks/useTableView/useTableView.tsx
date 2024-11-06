import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import { useDatabaseContext } from '@/lib/database-context'
import { db } from '@/lib/local-db'
import { FieldType, IColumnNode, ViewColumn } from '@/lib/model'
import { mappedByKey } from '@/lib/shared'
import { store } from '@/store'
import {
  DataEditorRef,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  GridColumnIcon,
  Item,
} from '@glideapps/glide-data-grid'
import { format } from 'date-fns'
import { produce } from 'immer'
import { DateCell } from '../../cells/date-cell'
import { FileCell } from '../../cells/file-cell'
import { MultipleSelectCell } from '../../cells/multiple-select-cell'
import { NoteCell } from '../../cells/note-cell'
import { PasswordCell } from '../../cells/password-cell'
import { RateCell } from '../../cells/rate-cell'
import { SingleSelectCell } from '../../cells/single-select-cell'
import { SystemDateCell } from '../../cells/system-date-cell'
import { TodoSourceCell } from '../../cells/todo-source-cell'
import { useLoadFiles } from './useLoadFiles'

function getCols(columns: IColumnNode[], viewColumns: ViewColumn[]) {
  const sortedColumns = viewColumns
    .map(({ columnId }) => {
      return columns.find((col) => col.id === columnId)!
    })
    .filter((col) => !!col)

  const viewColumnsMapped = mappedByKey(viewColumns, 'columnId')

  const cols: GridColumn[] = sortedColumns.map((col) => {
    function getIcon() {
      if (col.props.fieldType === FieldType.NUMBER) {
        return GridColumnIcon.HeaderNumber
      }
      return GridColumnIcon.HeaderString
    }

    const viewColumn = viewColumnsMapped[col.id]

    return {
      id: col.id,
      title: col.props.displayName,
      width: viewColumn?.width ?? 160,
      icon: getIcon(),
      hasMenu: true,
      themeOverride: {
        // bgHeader: ''
      },
    }
  })
  return cols
}

export function useTableView() {
  const {
    database,
    columns,
    rows,
    filterResult: { filterRows = [], cellNodesMapList = [] },
    cells,
    currentView,
    sortedColumns,
    deleteColumn,
    options,
    addRow,
    updateRowsIndexes,
  } = useDatabaseContext()

  const columnsMap = mappedByKey(columns, 'id')
  const rowsMap = mappedByKey(rows, 'id')
  let { viewColumns = [] } = currentView.props
  const [cols, setCols] = useState(getCols(columns, viewColumns))

  const indexes = useMemo(() => {
    return viewColumns.map((c) => c.columnId)
  }, [viewColumns])

  const gridRef = useRef<DataEditorRef>(null)

  const { cellFileRef } = useLoadFiles({
    gridRef,
    columns: sortedColumns,
    rows,
    cells,
    rowsMap,
    columnsMap,
  })

  const getContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell
      const dataRow = cellNodesMapList[row]
      const columnNode = columnsMap[indexes[col]]
      const rowNode = filterRows[row]
      const cellNode = dataRow[indexes[col]]

      function getCellData() {
        if (!dataRow) return ''
        const cellNode = dataRow[indexes[col]]
        if (!cellNode) return ''
        let cellData: any = cellNode.props.data ?? ''

        if (columnNode.props.fieldType === FieldType.NUMBER) {
          cellData = cellData?.toString()
        }

        return cellData
      }

      function getKind(): any {
        const maps: Record<any, GridCellKind> = {
          [FieldType.NUMBER]: GridCellKind.Number,
          [FieldType.URL]: GridCellKind.Uri,
          [FieldType.MARKDOWN]: GridCellKind.Markdown,
        }

        return maps[columnNode.props.fieldType] || GridCellKind.Text
      }
      const cellData = getCellData()

      if (columnNode.props.fieldType === FieldType.DATE) {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: cellData
            ? format(new Date(cellData), 'yyyy-MM-dd HH:mm:ss')
            : '',
          themeOverride: {
            //
          },
          data: {
            kind: 'date-cell',
            data: cellData,
          },
        } as DateCell
      }

      if (columnNode.props.fieldType === FieldType.RATE) {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: cellData,
          data: {
            kind: 'rate-cell',
            data: cellData,
          },
        } as RateCell
      }

      if (columnNode.props.fieldType === FieldType.PASSWORD) {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: cellData,
          data: {
            kind: 'password-cell',
            data: cellData,
          },
        } as PasswordCell
      }

      if (columnNode.props.fieldType === FieldType.TODO_SOURCE) {
        const node = store.node.getNode(cellData?.sourceId)

        return {
          kind: GridCellKind.Custom,
          allowOverlay: false,
          readonly: true,
          copyData: node.date || '',
          data: {
            kind: 'todo-source-cell',
            data: node ?? null,
          },
        } as TodoSourceCell
      }

      if (columnNode.props.fieldType === FieldType.FILE) {
        const url = cellFileRef.current[cellNode.id]?.url ?? ''
        const info = cellFileRef.current[cellNode.id]
        const fileHash = info?.fileHash ?? ''
        const googleDriveFileId = info?.googleDriveFileId ?? ''

        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          readonly: true,
          copyData: '',
          data: {
            kind: 'file-cell',
            fileHash,
            googleDriveFileId,
            url,
            name: '',
          },
        } as FileCell
      }

      if (
        [FieldType.SINGLE_SELECT, FieldType.MULTIPLE_SELECT].includes(
          columnNode.props.fieldType,
        )
      ) {
        const ids: string[] = Array.isArray(cellData) ? cellData : []
        const cellOptions = ids.map((id) => options.find((o) => o.id === id)!)

        /*
        console.log('%c=FieldType.SINGLE_SELECT','color:green',{
          cellOptions,
          options,
          columnNode,
          cellOptions_map:cellOptions.map((o) => o.id)
        })
        */

        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: cellOptions.map((o) => o.props.name).join(','),
          data: {
            kind:
              FieldType.SINGLE_SELECT === columnNode.props.fieldType
                ? 'single-select-cell'
                : 'multiple-select-cell',
            column: columnNode,
            options: cellOptions,
            data: cellOptions.map((o) => o.id),
          },
        } as SingleSelectCell | MultipleSelectCell
      }

      if (
        [FieldType.CREATED_AT, FieldType.UPDATED_AT].includes(
          columnNode.props.fieldType,
        )
      ) {
        const isCreatedAt = FieldType.CREATED_AT === columnNode.props.fieldType
        return {
          kind: GridCellKind.Custom,
          allowOverlay: false,
          readonly: true,
          copyData: format(
            isCreatedAt
              ? new Date(rowNode.createdAt)
              : new Date(rowNode.updatedAt),
            'yyyy-MM-dd HH:mm:ss',
          ),
          data: {
            kind: 'system-date-cell',
            data: rowNode,
            type: columnNode.props.fieldType,
          },
        } as SystemDateCell
      }

      if (col === 0 && cellNode?.props.ref) {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: '', // TODO: copy data
          data: {
            kind: 'note-cell',
            data: dataRow ? cellNode : null,
            column: columnNode,
          },
        } as NoteCell
      }

      return {
        kind: getKind(),
        allowOverlay: FieldType.NODE_ID !== columnNode.props.fieldType,
        readonly: FieldType.NODE_ID === columnNode.props.fieldType,
        data: cellData,
        displayData: cellData,
      }
    },
    [cellNodesMapList, filterRows, options, columnsMap, indexes, cellFileRef],
  )

  const setCellValue = async (
    [colIndex, rowIndex]: Item,
    newValue: EditableGridCell,
  ): Promise<void> => {
    const row = filterRows[rowIndex]
    const column = sortedColumns[colIndex]

    // need to improvement performance
    const cell = cells.find(
      (c) => c.props.columnId === column.id && c.props.rowId === row.id,
    )

    if (!cell) {
      return
    }

    let data: any = newValue.data

    // for custom cells
    if (typeof data === 'object') {
      data = data.data
    }

    // if no ref, no need to update
    if (!cell.props.ref) {
      await db.updateCell(cell.id, {
        props: { ...cell.props, data },
      })
    }

    const nodes = await db.listNodesByUserId()
    store.node.setNodes(nodes)
    updateRowsIndexes()
  }

  function onColumnResize(
    column: GridColumn,
    newSize: number,
    colIndex: number,
    newSizeWithGrow: number,
  ) {
    const newCols = produce(cols, (draft) => {
      draft[colIndex] = { ...draft[colIndex], width: newSize }
    })

    setCols(newCols)
  }

  async function onColumnResizeEnd(
    column: GridColumn,
    newSize: number,
    colIndex: number,
    newSizeWithGrow: number,
  ) {
    await db.updateViewColumn(currentView.id, column.id!, {
      width: newSize,
    })
  }

  const onDeleteColumn = useCallback(
    async (columnId: string) => {
      const newCols = cols.filter((col) => col.id !== columnId)
      setCols(newCols)
      await deleteColumn(columnId)
    },
    [cols, deleteColumn],
  )

  const onRowAppended = useCallback(() => {
    // TODO: RowsNum Should be based on rows? Otherwise there will be bugs in the filtering
    // setRowsNum((num) => num + 1)
    addRow()
  }, [addRow])

  useEffect(() => {
    const newCols = getCols(columns, viewColumns)
    // TODO: has bug when resize columns;f
    if (!isEqual(cols, newCols)) {
      setCols(newCols)
    }
    // TODO: don't add cols to deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, viewColumns])

  return {
    gridRef,
    rows,
    filterRows,
    rowsNum: cellNodesMapList.length,
    cols,
    getContent,
    setCellValue,
    onColumnResize,
    onColumnResizeEnd,
    onDeleteColumn,
    onRowAppended,
  }
}
