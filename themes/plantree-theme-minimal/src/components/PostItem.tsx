import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import { Post } from '../types'
import Link from './Link'

interface PostItemProps {
  post: CoreContent<Post>
}

export function PostItem({ post }: PostItemProps) {
  const { slug, date, title } = post

  return (
    <Link
      key={slug}
      href={`/posts/${slug}`}
      className="text-gray-700 hover:text-black dark:text-gray-100 flex items-center justify-between gap-6"
    >
      <div className="text-lg">{title}</div>
      <time dateTime={date} className="text-sm text-gray-400">
        {formatDate(date)}
      </time>
    </Link>
  )
}
