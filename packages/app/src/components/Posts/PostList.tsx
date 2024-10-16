import { Box } from '@fower/react'
import { usePosts } from '@plantreexyz/hooks'
import { PostItem } from './PostItem'

interface Props {}

export function PostList({}: Props) {
  const { posts } = usePosts()

  return (
    <Box column gap3 w={['100%', 720]} mx-auto pt10>
      {posts.map((item, index) => (
        <PostItem key={index} post={item} />
      ))}
    </Box>
  )
}
