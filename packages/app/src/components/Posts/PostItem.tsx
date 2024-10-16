import { Box } from '@fower/react'
import { MoreHorizontal } from 'lucide-react'
import {
  Menu,
  MenuItem,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from 'uikit'
import { Post } from '@plantreexyz/model'
import { store } from '@plantreexyz/store'

interface Props {
  post: Post
}

export function PostItem({ post }: Props) {
  return (
    <Box column roundedXL px3 py2 gap2 neutral600 black--hover>
      <Box>
        <Box
          inlineFlex
          textLG
          fontSemibold
          neutral900
          neutral600--hover
          cursorPointer
          onClick={() => {
            store.router.routeTo('POST', { fileName: post.fileName })
          }}
        >
          {post.title}
        </Box>
      </Box>
      <Box
        neutral500
        overflowHidden
        css={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {post.brief}
      </Box>
      <Box textSM toCenterY gap5 neutral500>
        <Box>{post.pubDateFormatted}</Box>
        {post.wordCount > 0 && <Box>{post.wordCount} words</Box>}

        <Popover>
          <PopoverTrigger>
            <Box toCenterY inlineFlex cursorPointer black--hover>
              <MoreHorizontal size={20} />
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <Menu>
              <PopoverClose
                asChild
                onClick={() => {
                  store.router.routeTo('POST', { fileName: post.fileName })
                }}
              >
                <MenuItem>Edit post</MenuItem>
              </PopoverClose>
              <MenuItem red500>Delete post</MenuItem>
            </Menu>
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  )
}
