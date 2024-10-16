import { useCallback, useEffect } from 'react'
import { fowerStore } from '@fower/react'
import { get, set } from 'idb-keyval'
import { atom, useAtom } from 'jotai'
import { FOWER_THEME_MODE } from '@plantreexyz/constants'

export const themeModeAtom = atom('')

export function useThemeMode() {
  const [mode, setModeState] = useAtom<string>(themeModeAtom)

  const setMode = useCallback(
    (mode: string, persistent = true) => {
      let fowerMode = mode

      if (mode == 'auto') {
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        fowerMode = media.matches ? 'dark' : 'light'
      }

      setModeState(mode)
      fowerStore.setMode(fowerMode)
      if (persistent) {
        set(FOWER_THEME_MODE, mode)
      }
    },
    [setModeState],
  )

  const initMode = useCallback(
    async function () {
      const value =
        localStorage.getItem('fower-mode') || (await get(FOWER_THEME_MODE))
      const media = window.matchMedia('(prefers-color-scheme: dark)')
      let newMode = ''

      if (value) {
        if (value === 'auto') {
          newMode = media.matches ? 'dark' : 'light'
        } else {
          newMode = value
        }
        setMode(newMode)
      } else {
        newMode = media.matches ? 'dark' : 'light'
        setMode(newMode)
        await set(FOWER_THEME_MODE, media ? 'dark' : 'light')
      }
    },
    [setMode],
  )

  useEffect(() => {
    if (!mode) {
      initMode()
    }
  }, [mode, initMode])

  return { mode, setMode, initMode }
}
