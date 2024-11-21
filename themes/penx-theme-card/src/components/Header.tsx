import { ReactNode, Suspense } from 'react'
import { Merienda } from 'next/font/google'
import { Site } from '@penxio/types'
import { cn } from '@penxio/utils'
import Link from './Link'

const merienda = Merienda({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/posts', title: 'Blog' },
  // { href: '/tags', title: 'Tags' },
  { href: '/about', title: 'About' },
  { href: '/membership', title: 'Membership', isMembership: true },
]

const headerNavLinksRight = [{ href: '/creator-fi/trade', title: 'CreatorFi' }]

interface Props {
  site: Site
  Logo: () => ReactNode
  ModeToggle: () => ReactNode
  MobileNav: () => ReactNode
  ConnectButton: () => ReactNode
  Airdrop: () => ReactNode
}

export const Header = ({
  site,
  Logo,
  ModeToggle,
  MobileNav,
  ConnectButton,
  Airdrop,
}: Props) => {
  return (
    <header className={cn('flex items-center w-full py-4 h-16 z-50')}>
      <div className="flex-1 no-scrollbar hidden items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6">
        {headerNavLinks.map((link) => {
          if (link.href === '/membership' && !site.spaceId) {
            return null
          }
          return (
            <Link
              key={link.title}
              href={link.href}
              className={cn(
                'font-medium hover:text-brand-500 dark:hover:text-brand-400 text-foreground/90',
                link.isMembership &&
                  'border border-brand-500 text-brand-500 rounded-full px-2 py-1 hover:bg-brand-500 hover:text-background text-sm',
              )}
            >
              {link.title}
            </Link>
          )
        })}
      </div>

      <Link href="/" aria-label={site.name}>
        <div className="flex items-center justify-between">
          <div
            className={cn(
              'hidden h-6 text-2xl font-semibold sm:block',
              merienda.className,
            )}
          >
            {site.name}
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-end flex-1 gap-4">
        <div className="no-scrollbar hidden items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6">
          {headerNavLinksRight.map((link) => {
            if (link.href === '/creator-fi/trade' && !site.spaceId) {
              return null
            }
            return (
              <Link
                key={link.title}
                href={link.href}
                className="font-medium  hover:text-brand-500 dark:hover:text-brand-400 text-foreground/90"
              >
                {link.title}
              </Link>
            )
          })}
        </div>

        {MobileNav && <MobileNav />}

        {Airdrop && (
          <div className="flex items-center">
            <Airdrop />
          </div>
        )}

        {ConnectButton && (
          <Suspense fallback={<div></div>}>
            <ConnectButton />
          </Suspense>
        )}
      </div>
    </header>
  )
}