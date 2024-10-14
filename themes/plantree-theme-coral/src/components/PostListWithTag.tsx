/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { slug } from 'github-slugger'
import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import { Post } from '../types'
import Link from './Link'
import { PostList } from './PostList'
import Tag from './Tag'
import { TagList } from './TagList'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface PostListWithTagProps {
  tagData: Record<string, number>
  posts: CoreContent<Post>[]
  title: string
  initialDisplayPosts?: CoreContent<Post>[]
  pagination?: PaginationProps
}

export function PostListWithTag({
  tagData = {},
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: PostListWithTagProps) {
  const displayPosts =
    initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="flex flex-col gap-10">
      <TagList tagData={tagData} title={title} />
      <PostList posts={displayPosts} />
    </div>
  )
}
