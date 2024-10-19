import { ReactNode } from 'react'
import { Site } from '@plantreexyz/types'
import { cn } from '@plantreexyz/utils'
import { ClientOnly } from './ClientOnly'
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
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="block font-medium text-gray-900 hover:text-brand-500 dark:text-gray-100 dark:hover:text-primary-400"
            >
              {link.title}
            </Link>
          ))}
        </div>
        {/* {MobileNav && <MobileNav />} */}
      </div>
      <div className="flex item-center gap-2">
        <ModeToggle />
        {!!ConnectButton && (
          <ClientOnly>
            <ConnectButton />
          </ClientOnly>
        )}
      </div>
    </header>
  )
}
