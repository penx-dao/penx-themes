import { MDXLayoutRenderer } from 'pliny/mdx-components'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { formatDate } from 'pliny/utils/formatDate'
import Image from '../components/Image'
import Link from '../components/Link'
import { PostItem } from '../components/PostItem'
import { Authors, Post } from '../types'

const MAX_DISPLAY = 3

interface Props {
  siteMetadata: any
  posts: Post[]
  authors: Authors[]
}

export function HomePage({ posts = [], authors, siteMetadata }: Props) {
  const author = authors.find((p) => p.slug === 'default') as Authors

  const {
    name,
    avatar,
    occupation,
    company,
    email,
    twitter,
    linkedin,
    github,
  } = author

  return (
    <div className="pt-24">
      <div className="max-w-none mb-10 text-gray-700 hover:text-black dark:text-gray-100">
        <div className="flex flex-row items-center justify-center gap-20">
          <div className="flex flex-col items-center space-x-2 flex-shrink-0">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
              {name}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            <MDXLayoutRenderer code={author.body.code} />
          </div>
        </div>
      </div>

      <div className="">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5 flex items-center justify-between">
          <h1 className="text-xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-3xl md:leading-14">
            Latest
          </h1>

          {posts.length > MAX_DISPLAY && (
            <Link
              href="/posts"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              All posts &rarr;
            </Link>
          )}
        </div>
        <div className="grid grid-cols-3 gap-x-6 gap-y-10">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            return <PostItem key={post.path} post={post} />
          })}
        </div>
      </div>
    </div>
  )
}
