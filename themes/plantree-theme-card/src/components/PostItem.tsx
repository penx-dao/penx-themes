import { Post } from '@plantreexyz/types'
import { formatDate } from '@plantreexyz/utils'
import Image from './Image'
import Link from './Link'
import Tag from './Tag'

interface PostItemProps {
  post: Post
}

export function PostItem({ post }: PostItemProps) {
  const { slug, title } = post

  return (
    <article key={slug} className="flex flex-col space-y-5">
      <Link
        href={`/posts/${slug}`}
        className="object-cover w-full h-52 bg-neutral-100 rounded-lg overflow-hidden hover:scale-105 transition-all"
      >
        {!!post?.image && (
          <Image
            src={post.image || ''}
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
              {formatDate(post.updatedAt)}
            </div>
            <div className="flex flex-wrap">
              {post.postTags
                // ?.slice(0, 3)
                ?.map((item) => (
                  <Tag key={item.id} postTag={item} className="text-sm" />
                ))}
            </div>
          </div>
          <h2 className="text-2xl font-bold leading-8 tracking-tight">
            <Link
              href={`/posts/${slug}`}
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
