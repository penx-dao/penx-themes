import { CoreContent } from 'pliny/utils/contentlayer'
import { PostListWithTag } from '../components/PostListWithTag'
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

export function BlogPage({ posts = [], tagData, title }: Props) {
  return <PostListWithTag posts={posts} tagData={tagData} title={title} />
}
