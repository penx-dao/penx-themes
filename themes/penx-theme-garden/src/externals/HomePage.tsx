import { Lobster, Merienda } from 'next/font/google'
import { Post, Site } from '@penxio/types'
import { PostItem } from '../components/PostItem'

const lobster = Lobster({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

interface Props {
  site: Site
  posts: Post[]
  ContentRender: (props: { content: any[]; className?: string }) => JSX.Element
  PostActions?: (props: { post: Post; className?: string }) => JSX.Element
}

export function HomePage({
  posts = [],
  site,
  PostActions,
  ContentRender,
}: Props) {
  const receivers = Array.from(new Set(posts.map((post) => post.user.address)))

  return (
    <div className="mx-auto sm:max-w-xl flex flex-col gap-10 mt-4">
      <div className="flex flex-col divide-y divide-foreground/5">
        {posts.map((post) => {
          return (
            <PostItem
              key={post.slug}
              post={post}
              PostActions={PostActions}
              ContentRender={ContentRender}
              receivers={receivers}
            />
          )
        })}
      </div>
    </div>
  )
}
