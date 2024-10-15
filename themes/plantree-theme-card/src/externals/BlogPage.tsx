import { Post } from '@plantreexyz/types'
import PageTitle from '../components/PageTitle'
import { PostList } from '../components/PostList'

interface Props {
  posts: Post[]
  initialDisplayPosts: Post[]
  pagination: {
    currentPage: number
    totalPages: number
  }
}

export function BlogPage({
  posts = [],
  pagination,
  initialDisplayPosts,
}: Props) {
  return (
    <div className="mt-20 space-y-6">
      <PageTitle className="text-center">Blog</PageTitle>
      <PostList
        posts={posts}
        pagination={pagination}
        initialDisplayPosts={initialDisplayPosts}
      />
    </div>
  )
}
