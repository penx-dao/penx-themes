import { ReactNode } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import SectionContainer from '../components/SectionContainer'

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
    <SectionContainer>
      <Header
        siteMetadata={siteMetadata}
        Logo={Logo}
        ThemeSwitch={ThemeSwitch}
        MobileNav={MobileNav}
        ConnectButton={ConnectButton}
      />
      <main className="mb-auto">{children}</main>
      <Footer siteMetadata={siteMetadata} />
    </SectionContainer>
  )
}
