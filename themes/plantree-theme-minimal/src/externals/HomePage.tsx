import { MDXLayoutRenderer } from 'pliny/mdx-components'
import Link from '../components/Link'
import PageTitle from '../components/PageTitle'
import { PostItem } from '../components/PostItem'
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
    <div className="">
      <div className="prose max-w-none mb-10 text-gray-700 hover:text-black dark:text-gray-100">
        <PageTitle>{siteMetadata.headerTitle}</PageTitle>

        <MDXLayoutRenderer code={author.body.code} />
      </div>

      <div className="">
        <div className="pb-6 pt-6 flex items-center justify-between">
          <h1 className="text-xl font-medium tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl leading-none">
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
        <div className="grid grid-cols-1 gap-3">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            return <PostItem key={post.path} post={post} />
          })}
        </div>
      </div>
    </div>
  )
}
