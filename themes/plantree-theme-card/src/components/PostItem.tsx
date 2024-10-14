import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import { Post } from '../types'
import Image from './Image'
import Link from './Link'
import Tag from './Tag'

interface PostItemProps {
  post: CoreContent<Post>
}

export function PostItem({ post }: PostItemProps) {
  const { path, date, title, summary, tags } = post
  return (
    <article key={path} className="flex flex-col space-y-5">
      <Link
        href={`/${path}`}
        className="object-cover w-full h-52 bg-neutral-100 rounded-lg overflow-hidden hover:scale-105 transition-all"
      >
        {!!post?.images?.length && (
          <Image
            src={post.images?.[0] || ''}
            alt=""
            width={400}
            height={400}
            className="object-cover w-full h-52"
          />
        )}
      </Link>
      <div className="space-y-3">
        <div>
          <div className="flex items-center text-sm gap-3">
            <div className="text-gray-500 dark:text-gray-400">
              {formatDate(date)}
            </div>
            <div className="flex flex-wrap">
              {tags
                ?.slice(0, 3)
                ?.map((tag) => (
                  <Tag key={tag} text={tag} className="text-sm" />
                ))}
            </div>
          </div>
          <h2 className="text-2xl font-bold leading-8 tracking-tight">
            <Link
              href={`/${path}`}
              className="text-gray-600 hover:text-black dark:text-gray-100 transition-colors"
            >
              {title}
            </Link>
          </h2>
        </div>
        {/* <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                  {summary}
                </div> */}
      </div>
    </article>
  )
}
