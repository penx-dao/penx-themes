import { ReactNode, Suspense } from 'react'
import { Lobster } from 'next/font/google'
import { Site } from '@penxio/types'
import { cn } from '@penxio/utils'
import Link from './Link'
import { PostTypeNav } from './PostTypeNav'

const lobster = Lobster({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

const headerNavLinks = [
  { href: '/', title: 'Home' },
  // { href: '/posts', title: 'Blog' },
  // { href: '/tags', title: 'Tags' },
  { href: '/about', title: 'About' },
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
        'flex items-start w-full justify-between py-4 z-50 bg-background/40 backdrop-blur-sm',
      )}
    >
      <div className="lg:flex items-center space-x-4 leading-5 sm:space-x-6 w-40 hidden">
        <div className="flex items-center space-x-4">
          {headerNavLinks.map((link) => {
            if (link.href === '/creator-fi/trade' && !site.spaceId) {
              return null
            }
            return (
              <Link
                key={link.title}
                href={link.href}
                className="font-medium hover:text-brand-500 dark:hover:text-brand-400 text-foreground/60 text-xs"
              >
                {link.title}
              </Link>
            )
          })}
        </div>
        {/* {MobileNav && <MobileNav />} */}
      </div>

      <div className="flex-1">
        <div className="flex flex-col items-center lg:justify-between gap-4 lg:mx-auto sm:max-w-xl">
          <div className="flex items-center justify-center gap-2">
            {site.logo && (
              <img src={site.logo} alt="" className="w-8 h-8 rounded-full" />
            )}
            <div
              className={cn(
                'font-normal text-2xl flex-shrink-0',
                lobster.className,
              )}
            >
              {site.name}
            </div>
          </div>
          <PostTypeNav />
        </div>
      </div>
      <div className="flex item-center justify-end gap-2 w-40">
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
