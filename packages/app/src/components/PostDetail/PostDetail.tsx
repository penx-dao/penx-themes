import { Box } from '@fower/react'
import { ChevronLeft } from 'lucide-react'
import { Button } from 'uikit'
import { useSelectedTreeName, useTrees } from '@plantreexyz/hooks'
import { store } from '@plantreexyz/store'
import { previewSite } from '../../common/previewSite'
import { UserAvatar } from '../UserAvatar'
import { CoverUpload } from './CoverUpload'
import { PostContent } from './PostContent'
import { PostTitle } from './PostTitle'

export const PostDetail = () => {
  const { selectedName } = useSelectedTreeName()
  return (
    <Box bgWhite minH-100vh shadow2XL>
      <Box toBetween sticky top0 p4>
        <Box
          inlineFlex
          circle9
          bgNeutral200--hover
          transitionColors
          toCenter
          neutral600
          cursorPointer
          onClick={() => {
            store.router.routeTo('HOME')
          }}
        >
          <ChevronLeft />
        </Box>
        <Box>
          <Button
            colorScheme="black"
            onClick={async () => {
              previewSite()
            }}
          >
            Preview
          </Button>
        </Box>
      </Box>
      <Box w={['100%', '100%', 720]} mx-auto column gap6 pt10>
        <Box column gap2>
          <CoverUpload />
          <PostTitle />
        </Box>
        <Box toCenterY gap1>
          <UserAvatar />
          <Box neutral500>{selectedName}</Box>
        </Box>
        <PostContent />
      </Box>
    </Box>
  )
}
