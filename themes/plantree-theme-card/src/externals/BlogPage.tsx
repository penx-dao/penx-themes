import { CoreContent } from 'pliny/utils/contentlayer'
import PageTitle from '../components/PageTitle'
import { PostList } from '../components/PostList'
import { Post } from '../types'

interface Props {
  posts: CoreContent<Post>[]
  tagData: Record<string, number>
  title: string
  initialDisplayPosts: CoreContent<Post>[]
  pagination: {
    currentPage: number
    totalPages: number
  }
}

export function BlogPage({
  posts = [],
  pagination,
  initialDisplayPosts,
  tagData,
  title,
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
