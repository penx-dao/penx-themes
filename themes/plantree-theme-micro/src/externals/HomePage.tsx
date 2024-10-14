import { MDXLayoutRenderer } from 'pliny/mdx-components'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { formatDate } from 'pliny/utils/formatDate'
import Link from '../components/Link'
import { Authors, Post } from '../types'

const MAX_DISPLAY = 5

interface Props {
  siteMetadata: any
  posts: Post[]
  authors: Authors[]
}

export function HomePage({ posts = [], authors, siteMetadata }: Props) {
  const author = authors.find((p) => p.slug === 'default') as Authors

  return (
    <div className="pt-24">
      <div className="prose max-w-none mb-10 text-gray-700 hover:text-black dark:text-gray-100">
        <div className="text-4xl font-bold">{siteMetadata.headerTitle}</div>

        <MDXLayoutRenderer code={author.body.code} />
      </div>

      <div className="">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5 flex items-center justify-between">
          <h1 className="text-xl font-medium leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-3xl md:leading-14">
            Latest
          </h1>

          {posts.length > MAX_DISPLAY && (
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              All posts &rarr;
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <Link
                key={slug}
                href={`/posts/${slug}`}
                className="text-gray-700 hover:text-black dark:text-gray-100 flex items-center justify-between gap-6"
              >
                <div className="text-lg">{title}</div>
                <time dateTime={date} className="text-sm text-gray-400">
                  {formatDate(date, siteMetadata.locale)}
                </time>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
