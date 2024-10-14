import { Post } from '@saplingdao/types'
import { TipTapNode, TipTapRender } from '@troop.com/tiptap-react-render'
import { GateCover } from './GateCover'
import { handlers } from './handlers'

interface Props {
  canRead: boolean
  post: Post
}

export function PostCreation({ canRead = true, post }: Props) {
  const node: TipTapNode = JSON.parse(post.content || '{}')
  const len = node.content?.length || 0

  // hided half of the content
  node.content = canRead
    ? node.content
    : node.content?.slice(1, parseInt((len * 0.5) as any)) || []

  return (
    <div className="relative min-h-[400px] mt-4">
      <div className="relative">
        <TipTapRender handlers={handlers} node={node} />
        {!canRead && <GateCover />}
      </div>
    </div>
  )
}
