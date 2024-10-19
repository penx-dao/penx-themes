import { ReactNode } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import SectionContainer from '../components/SectionContainer'

interface Props {
  site: any
  Logo: () => ReactNode
  ModeToggle: () => ReactNode
  MobileNav: () => ReactNode
  ConnectButton: () => ReactNode
  children: ReactNode
}

export function SiteLayout({
  children,
  site,
  Logo,
  ModeToggle,
  MobileNav,
  ConnectButton,
}: Props) {
  return (
    <SectionContainer>
      <Header
        site={site}
        Logo={Logo}
        ModeToggle={ModeToggle}
        MobileNav={MobileNav}
        ConnectButton={ConnectButton}
      />
      <main className="mb-auto">{children}</main>
      <Footer site={site} ModeToggle={ModeToggle} />
    </SectionContainer>
  )
}
