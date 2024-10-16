import { Box, FowerHTMLProps } from '@fower/react'

/**
 * ⌥ -> lef option
 * ⎇ -> right option
 * ⇧ -> shift
 * ⌘ -> command
 * ↵ -> enter
 * ⌃ -> control
 * ⌦ -> delete
 */

interface Props extends FowerHTMLProps<'kbd'> {}

const map: Record<string, string> = {
  Control: '⌃',
  Meta: '⌘',
  Command: '⌘',
  Shift: '⇧',
  Alt: '⌥',
}

export const Kbd = ({ children, ...rest }: Props) => {
  const modifierKey = map[children as any]
  return (
    <Box
      as="kbd"
      bgNeutral300
      neutral600
      h5
      minW5
      px1
      rounded-4
      toCenter
      text-12
      // fontSans
      style={{
        fontFamily:
          "'Inter', --apple-system, BlinkMacSystemFont, Segoe UI, Roboto,Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      }}
      {...rest}
    >
      {!modifierKey && children}
      {!!modifierKey && modifierKey}
    </Box>
  )
}
