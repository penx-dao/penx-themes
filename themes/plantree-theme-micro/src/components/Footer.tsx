import { ReactNode } from 'react'
import { Site } from '@plantreexyz/types'
import Link from './Link'
import SocialIcon from './social-icons'

interface Props {
  ThemeSwitch: () => ReactNode
  site: any
}

export function Footer({ site, ThemeSwitch }: Props) {
  if (!site) return null
  return (
    <footer className="mt-auto mb-8">
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${site?.email}`} size={6} />
          <SocialIcon kind="github" href={site.github} size={6} />
          <SocialIcon kind="facebook" href={site.facebook} size={6} />
          <SocialIcon kind="youtube" href={site.youtube} size={6} />
          <SocialIcon kind="linkedin" href={site.linkedin} size={6} />
          <SocialIcon kind="twitter" href={site.twitter} size={6} />
          <SocialIcon kind="x" href={site.x} size={6} />
          <SocialIcon kind="instagram" href={site.instagram} size={6} />
          <SocialIcon kind="threads" href={site.threads} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          {/* <div>{` • `}</div> */}
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <div>{site.name}</div>
          {/* <Link href="/">{site.title}</Link> */}
        </div>
      </div>
    </footer>
  )
}
