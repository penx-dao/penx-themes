import { Post } from '@saplingdao/types'
import { ContentRender } from '../ContentRender'
import { GateCover } from './GateCover'

interface Props {
  canRead: boolean
  post: Post
}

export function PostCreation({ canRead = true, post }: Props) {
  // hided half of the content
  const renderRate = canRead ? 1 : 0.5

  return (
    <div className="relative min-h-[400px] mt-4">
      <div className="relative">
        <ContentRender content={post.content} renderRate={renderRate} />
      </div>
    </div>
  )
}
