import { Input } from 'uikit'
import { usePosts } from '@plantreexyz/hooks'
import { useSavePost } from '../../hooks/useSavePost'

interface Props {}

export function PostTitle({}: Props) {
  const { activePost } = usePosts()
  const savePost = useSavePost()
  return (
    <Input
      placeholder="Title"
      variant="unstyled"
      leadingNone
      h="1.5em"
      text4XL
      fontSemibold
      defaultValue={activePost?.title}
      onChange={(e) => {
        activePost.updateFrontmatter({ title: e.target.value })
        savePost(activePost)
      }}
    />
  )
}
