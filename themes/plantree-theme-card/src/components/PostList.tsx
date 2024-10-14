import { CoreContent } from 'pliny/utils/contentlayer'
import { Post } from '../types'
import { Pagination } from './Pagination'
import { PostItem } from './PostItem'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface PostListProps {
  posts: CoreContent<Post>[]
  initialDisplayPosts?: CoreContent<Post>[]
  pagination?: PaginationProps
}

export function PostList({
  posts,
  initialDisplayPosts = [],
  pagination,
}: PostListProps) {
  const displayPosts =
    initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-x-6 gap-y-10">
        {displayPosts.map((post) => {
          return <PostItem key={post.path} post={post} />
        })}
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </div>
  )
}
