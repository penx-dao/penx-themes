'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { WalletConnectButton } from '@/components/WalletConnectButton'
import { cn } from '@/lib/utils'
import { AuthType } from '@prisma/client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useSession } from 'next-auth/react'
import { useAccount } from 'wagmi'
import { GoogleOauthButton } from '../GoogleOauthButton'
import { GoogleOauthDialog } from '../GoogleOauthDialog/GoogleOauthDialog'
import LoginButton from '../LoginButton'
import { useSiteContext } from '../SiteContext'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { ProfileDialog } from './ProfileDialog/ProfileDialog'
import { ProfilePopover } from './ProfilePopover'

interface Props {}

export function Profile({}: Props) {
  const { data, status } = useSession()
  const { address = '' } = useAccount()
  const site = useSiteContext()

  if (status === 'loading')
    return (
      <Avatar className="h-8 w-8">
        <AvatarFallback></AvatarFallback>
      </Avatar>
    )

  const authenticated = !!data

  return (
    <>
      <ProfileDialog />
      <GoogleOauthDialog />
      {!authenticated && <LoginButton />}
      {authenticated && <ProfilePopover />}
    </>
  )
}
