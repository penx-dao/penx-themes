import { ReactNode } from 'react'
import { Merienda } from 'next/font/google'
import { cn } from '../lib/utils'
import { ClientOnly } from './ClientOnly'
import Link from './Link'
import { SearchButton } from './SearchButton'

const merienda = Merienda({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/posts', title: 'Blog' },
  { href: '/tags', title: 'Tags' },
  { href: '/about', title: 'About' },
]

const headerNavLinksRight = [{ href: '/creator-fi/trade', title: 'CreatorFi' }]

interface Props {
  siteMetadata: any
  Logo: () => ReactNode
  ThemeSwitch: () => ReactNode
  MobileNav: () => ReactNode
  ConnectButton: () => ReactNode
}

export const Header = ({
  siteMetadata,
  Logo,
  ThemeSwitch,
  MobileNav,
  ConnectButton,
}: Props) => {
  return (
    <header
      className={cn(
        'flex items-center w-ful dark:bg-gray-950 py-4 h-16',
        siteMetadata.stickyNav && 'sticky top-0 z-50',
      )}
    >
      <div className="flex-1 no-scrollbar hidden items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6">
        {headerNavLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
          >
            {link.title}
          </Link>
        ))}
      </div>

      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div
              className={cn(
                'hidden h-6 text-2xl font-semibold sm:block',
                merienda.className,
              )}
            >
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>

      <div className="flex items-center justify-end flex-1 gap-4">
        <div className="no-scrollbar hidden items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6">
          {headerNavLinksRight.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
            >
              {link.title}
            </Link>
          ))}
        </div>

        <SearchButton siteMetadata={siteMetadata} />
        {ThemeSwitch && <ThemeSwitch />}
        {MobileNav && <MobileNav />}
        {ConnectButton && (
          <ClientOnly>
            <ConnectButton />
          </ClientOnly>
        )}
      </div>
    </header>
  )
}
