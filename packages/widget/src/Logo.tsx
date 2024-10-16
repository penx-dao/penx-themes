import { Box, FowerHTMLProps } from '@fower/react'
import { IconLogo } from '@plantreexyz/icons'

interface Props extends FowerHTMLProps<'div'> {
  size?: number
  showText?: boolean
  stroke?: number | string
}

export const Logo = ({
  showText = true,
  size = 32,
  stroke = 2,
  ...rest
}: Props) => {
  const content = (
    <>
      <IconLogo
        size={size * 0.9}
        strokeWidth={30}
        stroke="black"
        fillWhite--dark
        stroke--dark="white"
      />

      {showText && (
        <Box>
          <Box text={size} fontBold toCenterY>
            <Box>Pen</Box>
            <Box brand500>X</Box>
          </Box>
        </Box>
      )}
    </>
  )
  return (
    <Box toCenterY gray800--hover black gapX1 {...rest}>
      {content}
    </Box>
  )
}
