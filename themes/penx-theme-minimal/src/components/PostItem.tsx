import { Post, PostType } from '@penxio/types'
import { formatDate } from '@penxio/utils'
import Link from './Link'

interface PostItemProps {
  post: Post
}

export function PostItem({ post }: PostItemProps) {
  const { slug, title } = post
  if (post.type !== PostType.ARTICLE) return null

  return (
    <Link
      key={slug}
      href={`/posts/${slug}`}
      className="hover:text-black flex items-center justify-between gap-6 text-foreground/80"
    >
      <div className="text-lg">{title}</div>
      <time className="text-sm text-foreground/50">
        {formatDate(post.updatedAt)}
      </time>
    </Link>
  )
}
