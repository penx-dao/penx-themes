'use client'

import { createContext, PropsWithChildren, useContext } from 'react'
import { Site } from '@prisma/client'

export const SiteContext = createContext({} as Site)

interface Props {
  site: Site
}

export const SiteProvider = ({ site, children }: PropsWithChildren<Props>) => {
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>
}

export function useSiteContext() {
  return useContext(SiteContext)
}
