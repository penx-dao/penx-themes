import { ReactNode } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import SectionContainer from '../components/SectionContainer'
import { Sidebar } from '../components/sidebar'

interface Props {
  siteMetadata: any
  Logo: () => ReactNode
  ThemeSwitch: () => ReactNode
  MobileNav: () => ReactNode
  ConnectButton: () => ReactNode
  children: ReactNode
}

export function SiteLayout({
  children,
  siteMetadata,
  Logo,
  ThemeSwitch,
  MobileNav,
  ConnectButton,
}: Props) {
  return (
    <div className="flex relative">
      <Sidebar siteMetadata={siteMetadata} />
      <div className="flex-1">
        <Header
          siteMetadata={siteMetadata}
          Logo={Logo}
          ThemeSwitch={ThemeSwitch}
          MobileNav={MobileNav}
          ConnectButton={ConnectButton}
        />

        <SectionContainer>
          <main className="mb-auto">{children}</main>
          <Footer siteMetadata={siteMetadata} />
        </SectionContainer>
      </div>
    </div>
  )
}
