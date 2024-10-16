import { useEffect } from 'react'
import { Box } from '@fower/react'
import { Button, Spinner } from 'uikit'
import { Logo } from '@plantreexyz/widget'

interface DesktopWelcomeProps {
  isLoading: boolean
  onGetStarted: () => void
}
export function DesktopWelcome({
  onGetStarted,
  isLoading,
}: DesktopWelcomeProps) {
  return (
    <Box
      data-tauri-drag-region
      w-100p
      h-100p
      toCenter
      bgWhite
      column
      gap3
      black
    >
      <Box data-tauri-drag-region toCenterY gap2>
        <Box data-tauri-drag-region text2XL fontLight neutral400>
          Welcome to
        </Box>
        <Logo></Logo>
      </Box>
      <Box text3XL toCenterY gap2>
        <Box fontBold>A cross-platform productivity App</Box>
      </Box>

      <Button
        variant="outline"
        colorScheme="black"
        size="lg"
        mt5
        disabled={isLoading}
        onClick={() => onGetStarted()}
      >
        {isLoading && <Spinner />}
        <Box>Get Started</Box>
      </Button>
    </Box>
  )
}
