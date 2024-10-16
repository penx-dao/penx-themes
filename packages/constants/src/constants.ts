const env: Record<string, string> = (() => {
  if (typeof process !== 'undefined') return process.env
  if (typeof (import.meta as any).env !== 'undefined') {
    return (import.meta as any)?.env
  }
  return {}
})()

export const DEFAULT_THEME = env.NEXT_PUBLIC_DEFAULT_THEME || 'dark'
export const FOWER_THEME_MODE = 'FOWER_THEME_MODE'

export const ASSETS_DIR_NAME = 'plantree-xyz'

export const isServer = typeof window === 'undefined'

export const isBrowser = typeof window !== 'undefined'

export const isNavigator = typeof navigator !== 'undefined'

export const isProd = env.NODE_ENV === 'production'

export const SIDEBAR_WIDTH = 220

export const ENV_BASE_URL =
  env.NEXT_PUBLIC_API_BASE_URL ||
  env.NEXT_PUBLIC_NEXTAUTH_URL ||
  env.VITE_API_URL ||
  env.PLASMO_PUBLIC_BASE_URL

export const BASE_URL = (() => {
  if (ENV_BASE_URL) return ENV_BASE_URL
  if (isServer) return ''
  return `${location.protocol}//${location.host}`
})()

export enum ModalNames {
  CREATE_SPACE,
  SETTINGS,
  DOMAINS,
}
