import { ReactNode, Suspense } from 'react'
import { Site } from '@plantreexyz/types'
import { cn } from '@plantreexyz/utils'
import Link from './Link'

const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/posts', title: 'Blog' },
  { href: '/tags', title: 'Tags' },
  { href: '/creator-fi/trade', title: 'CreatorFi' },
]

interface Props {
  site: Site
  Logo: () => ReactNode
  ModeToggle: () => ReactNode
  MobileNav: () => ReactNode
  ConnectButton: () => ReactNode
}

export const Header = ({
  site,
  Logo,
  ModeToggle,
  MobileNav,
  ConnectButton,
}: Props) => {
  return (
    <header
      className={cn(
        'flex items-center w-ful dark:bg-gray-950 justify-between py-4 h-16 z-50',
      )}
    >
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="flex items-center space-x-4">
          {headerNavLinks.map((link) => {
            if (link.href === '/creator-fi/trade' && !site.spaceId) {
              return null
            }
            return (
              <Link
                key={link.title}
                href={link.href}
                className="font-medium hover:text-brand-500 dark:hover:text-brand-400 text-foreground/90"
              >
                {link.title}
              </Link>
            )
          })}
        </div>
        {/* {MobileNav && <MobileNav />} */}
      </div>
      <div className="flex item-center gap-2">
        <ModeToggle />
        {!!ConnectButton && (
          <Suspense fallback={<div></div>}>
            <ConnectButton />
          </Suspense>
        )}
      </div>
    </header>
  )
}
