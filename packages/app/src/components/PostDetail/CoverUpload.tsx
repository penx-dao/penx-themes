import { forwardRef, useRef, useState } from 'react'
import { Box } from '@fower/react'
import { Edit3, ImageIcon, X } from 'lucide-react'
import { Input, Spinner } from 'uikit'

interface Props {}

export const CoverUpload = forwardRef<HTMLDivElement, Props>(
  function CoverUpload({}, ref) {
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('====e.target.files:', e.target.files)

      if (e.target.files?.length) {
        setLoading(true)
        const file = e.target.files[0]
        const src = URL.createObjectURL(file)
        console.log('src====')
        setValue(src)

        // const res = await fetch(`/api/upload?filename=${file.name}`, {
        //   method: 'POST',
        //   body: file,
        // })

        // if (res.ok) {
        //   //
        // } else {
        //   console.log('Failed to upload file')
        // }
        setLoading(false)
      }
    }

    async function removeCover() {
      setValue('')
      //
    }

    if (value) {
      return (
        <Box w-100p h-360 relative>
          <Box
            as="img"
            src={value || ''}
            absolute
            left0
            top0
            w-100p
            h-360
            cursorPointer
            alt=""
          />

          <Box
            inlineFlex
            absolute
            top1
            right1
            bgNeutral100
            roundedFull
            p1
            neutral800
            w8
            h8
            cursorPointer
            toCenter
          >
            <X onClick={removeCover} />
          </Box>
        </Box>
      )
    }

    return (
      <Box ref={ref}>
        <Box w32 h8 rounded2XL bgNeutral100 relative cursorPointer toCenterY>
          <Box
            absolute
            left0
            top0
            w-100p
            h-100p
            cursorPointer
            zIndex-1
            toCenter
            gap-1
            neutral400
            textSM
          >
            <ImageIcon size={18} />
            <Box>Add cover</Box>
          </Box>

          <Input
            variant="unstyled"
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
            absolute
            left0
            top0
            opacity-0
            w-100p
            h-100p
            cursorPointer
            zIndex-10
          />
          {loading && <Spinner />}
        </Box>
      </Box>
    )
  },
)
