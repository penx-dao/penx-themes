import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import { Post } from '../types'
import Link from './Link'
import Tag from './Tag'

interface PostItemProps {
  post: CoreContent<Post>
}

export function PostItem({ post }: PostItemProps) {
  const { path, date, title, summary, tags } = post
  return (
    <div className="py-5">
      <article className="flex flex-col space-y-2 xl:space-y-0">
        <div className="space-y-3">
          <div>
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
              <Link
                href={`/${path}`}
                className="text-gray-600 hover:text-black dark:text-gray-100 transition-colors"
              >
                {title}
              </Link>
            </h2>
            <div className="flex items-center text-sm gap-3">
              <div className="text-gray-500 dark:text-gray-400">
                {formatDate(date)}
              </div>
              <div className="flex flex-wrap">
                {tags?.map((tag) => (
                  <Tag key={tag} text={tag} className="text-sm" />
                ))}
              </div>
            </div>
          </div>
          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
            {summary}
          </div>
        </div>
      </article>
    </div>
  )
}
