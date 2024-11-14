import { Lobster, Merienda } from 'next/font/google'
import { Post, PostType, Site } from '@penxio/types'
import { cn } from '@penxio/utils'
import { PostItem } from '../components/PostItem'

const merienda = Lobster({
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

export function HomePage({ posts = [], site, PostActions }: Props) {
  const creations = posts.filter((post) => post.type === PostType.IMAGE)

  const receivers = Array.from(
    new Set(creations.map((post) => post.user.address)),
  )

  return (
    <div className="mx-auto sm:max-w-xl flex flex-col gap-10 -mt-16">
      <div className="flex items-center gap-2 sticky top-0 bg-background/40 py-4 z-50 backdrop-blur-sm">
        {site.logo && (
          <img src={site.logo} alt="" className="w-10 h-10 rounded-full" />
        )}
        <div className={cn('font-normal text-3xl', merienda.className)}>
          {site.name}
        </div>
      </div>
      <div className="flex flex-col gap-12">
        {creations.map((post) => {
          return (
            <PostItem
              key={post.slug}
              post={post}
              PostActions={PostActions}
              receivers={receivers}
            />
          )
        })}
      </div>
    </div>
  )
}
