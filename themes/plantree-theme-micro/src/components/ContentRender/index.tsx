import { TipTapNode, TipTapRender } from '@troop.com/tiptap-react-render'
import { handlers } from './handlers'

interface Props {
  content: string
  renderRate?: number
}

export function ContentRender({ content, renderRate = 1 }: Props) {
  const node: TipTapNode = JSON.parse(content || '{}')
  const len = node.content?.length || 0

  node.content =
    renderRate === 1
      ? node.content
      : node.content?.slice(1, parseInt((len * renderRate) as any)) || []
  return <TipTapRender handlers={handlers} node={node} />
}
