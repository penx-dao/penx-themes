import { ElementProps } from '@/lib/extension-typings'
import { DatabaseContainerElement, DatabaseEntryElement } from '../types'
import { Database } from './Database'

export const DatabaseContainer = ({
  attributes,
  element,
  children,
}: ElementProps<DatabaseContainerElement>) => {
  return (
    <Database attributes={attributes} element={element as any}>
      {children}
    </Database>
  )
}
