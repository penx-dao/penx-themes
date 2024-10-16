import { Button } from 'uikit'
import { usePosts } from '@plantreexyz/hooks'

export const CreatePostButton = () => {
  const { createPost } = usePosts()
  return (
    <Button
      size="sm"
      colorScheme="black"
      onClick={async () => {
        await createPost()
      }}
    >
      Write
    </Button>
  )
}
