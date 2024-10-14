import { Post } from '@saplingdao/types'
import { formatDate } from '@saplingdao/utils'
import Link from './Link'

interface PostItemProps {
  post: Post
}

export function PostItem({ post }: PostItemProps) {
  const { slug, title } = post

  return (
    <Link
      key={slug}
      href={`/posts/${slug}`}
      className="text-gray-700 hover:text-black dark:text-gray-100 flex items-center justify-between gap-6"
    >
      <div className="text-lg">{title}</div>
      <time className="text-sm text-gray-400">
        {formatDate(post.updatedAt)}
      </time>
    </Link>
  )
}
