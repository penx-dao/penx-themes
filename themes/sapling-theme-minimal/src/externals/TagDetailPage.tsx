import { Post } from '@saplingdao/types'
import { PostListWithTag } from '../components/PostListWithTag'

interface Props {
  posts: Post[]
  tagData: Record<string, number>
  title: string
}

export function TagDetailPage({ posts = [], tagData, title }: Props) {
  return <PostListWithTag posts={posts} tagData={tagData} title={title} />
}
