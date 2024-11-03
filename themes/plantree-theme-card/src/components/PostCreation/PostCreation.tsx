import { Post } from '@plantreexyz/types'
import { ContentRender } from '../ContentRender'

interface Props {
  canRead: boolean
  post: Post
}

export function PostCreation({ canRead = true, post }: Props) {
  // hided half of the content
  const renderRate = canRead ? 1 : 0.5

  return (
    <div className="relative mt-4">
      <div className="relative">
        <ContentRender content={post.content} renderRate={renderRate} />
      </div>
    </div>
  )
}
