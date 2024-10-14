import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
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
      <ul>
        {displayPosts.map((post) => {
          return <PostItem key={post.path} post={post} />
        })}
      </ul>
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </div>
  )
}
