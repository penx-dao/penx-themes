import { withLists } from '@/lib/slate-lists'
import { listSchema } from '../listSchema'

export const withListsPlugin = withLists(listSchema)
