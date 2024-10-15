import { ReactNode } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import SectionContainer from '../components/SectionContainer'

interface Props {
  site: any
  Logo: () => ReactNode
  ThemeSwitch: () => ReactNode
  MobileNav: () => ReactNode
  ConnectButton: () => ReactNode
  children: ReactNode
}

export function SiteLayout({
  children,
  site,
  Logo,
  ThemeSwitch,
  MobileNav,
  ConnectButton,
}: Props) {
  return (
    <SectionContainer>
      <Header
        site={site}
        Logo={Logo}
        ThemeSwitch={ThemeSwitch}
        MobileNav={MobileNav}
        ConnectButton={ConnectButton}
      />
      <main className="mb-auto">{children}</main>
      <Footer site={site} ThemeSwitch={ThemeSwitch} />
    </SectionContainer>
  )
}
