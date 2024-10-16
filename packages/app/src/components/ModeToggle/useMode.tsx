import { useEffect, useState } from 'react'
import { fowerStore } from '@fower/react'
import { getCookie, setCookie } from 'cookies-next'
import { atom, useAtom } from 'jotai'

interface Result {
  mode: string
  setMode: (mode: string) => void
}

const modeAtom = atom('')

export function useMode(): Result {
  const [mode, setModeState] = useAtom<string>(modeAtom)

  useEffect(() => {
    const mode = getCookie('theme-mode') as string
    setMode(mode || 'dark')
  }, [])

  function setMode(mode: string) {
    setModeState(mode)
    setCookie('theme-mode', mode)
    fowerStore.setMode(mode)
  }

  return { mode, setMode } as Result
}
