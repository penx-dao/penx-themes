'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Sidebar } from '@/app/~/(dashboard)/Sidebar/Sidebar'
import { CreationDialog } from '@/components/CreationDialog/CreationDialog'
import LoadingDots from '@/components/icons/loading-dots'
import { NavbarWrapper } from '@/components/Navbar/NavbarWrapper'
import { NodesProvider } from '@/components/NodesProvider'
import { useQueryEthBalance } from '@/hooks/useEthBalance'
import { useQueryEthPrice } from '@/hooks/useEthPrice'
import { SIDEBAR_WIDTH } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { push } = useRouter()
  const [sidebarOpen, setSideBarOpen] = useState(true)
  useQueryEthPrice()
  useQueryEthBalance()
  const { status, data: session } = useSession()

  const pathname = usePathname()
  const isNote = pathname.includes('/~/today') || pathname.includes('/~/notes')

  useEffect(() => {
    if (status === 'loading') return
    if (status == 'unauthenticated') {
      push('/')
    }
  }, [status, push])

  if (status === 'loading' || !session)
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingDots className="bg-foreground/60"></LoadingDots>
      </div>
    )

  return (
    <div className="h-screen flex fixed top-0 left-0 bottom-0 right-0">
      <div
        className={cn('h-screen sticky top-0 left-0')}
        style={{ width: SIDEBAR_WIDTH }}
      >
        <Sidebar />
      </div>
      <div className="flex-1 pb-40 h-screen overflow-auto">
        <NodesProvider>
          {/* <NavbarWrapper /> */}
          <CreationDialog />
          <div
            className={cn(
              !isNote && 'mx-auto md:max-w-2xl pt-16 pb-20',
              isNote,
            )}
          >
            {children}
          </div>
        </NodesProvider>
      </div>
    </div>
  )
}
