import { PropsWithChildren, useEffect, useRef } from 'react'
import { Box } from '@fower/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Spinner } from 'uikit'
import { useAppLoading } from '@plantreexyz/hooks'
import { AppService } from '@plantreexyz/service'

const queryClient = new QueryClient()

export function AppProvider({ children }: PropsWithChildren) {
  const { loading } = useAppLoading()
  const initedRef = useRef(false)
  const appRef = useRef(new AppService())

  useEffect(() => {
    if (initedRef.current) return
    initedRef.current = true

    appRef.current.init().then(() => {
      //
    })
  }, [])

  if (loading) {
    return (
      <Box toCenter h-80vh>
        <Spinner />
      </Box>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
