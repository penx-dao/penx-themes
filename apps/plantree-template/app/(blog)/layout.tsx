import { Profile } from '@/components/Profile/Profile'
import { WalletConnectButton } from '@/components/WalletConnectButton'
import { getSite } from '@/lib/fetchers'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const site = await getSite()

  const { SiteLayout } = await import(process.env.NEXT_PUBLIC_THEME!)

  return (
    <SiteLayout
      site={site}
      Logo={null}
      ThemeSwitch={null}
      MobileNav={null}
      ConnectButton={Profile}
    >
      {children}
    </SiteLayout>
  )
}
