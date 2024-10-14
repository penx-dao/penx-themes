'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar } from '@/components/UserAvatar'
import { useAddress } from '@/app/(creator-fi)/hooks/useAddress'
import { useContributors } from '@/app/(creator-fi)/hooks/useContributors'
import { useSpace } from '@/app/(creator-fi)/hooks/useSpace'
import { shortenAddress } from '@/lib/utils'
import { useGiveShareDialog } from './GiveShareDialog/useGiveShareDialog'

export function ContributorList() {
  const { contributors = [], isLoading } = useContributors()
  const { setState } = useGiveShareDialog()
  const { space } = useSpace()
  const address = useAddress()

  if (isLoading) {
    return (
      <div className="grid gap-4">
        {Array(5)
          .fill('')
          .map((_, i) => (
            <Skeleton key={i} className="h-[60px] rounded-lg" />
          ))}
      </div>
    )
  }

  if (!contributors.length) {
    return (
      <div className="grid gap-4 mx-auto sm:w-full  text-neutral-400">
        No contributors yet.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {contributors.map((item, index) => (
        <div key={index} className="flex justify-between">
          <div className="flex gap-2 items-center">
            <UserAvatar address={item.account} />
            <div>{shortenAddress(item.account)}</div>
            {space.isFounder(item.account) ? (
              <Badge>Founder</Badge>
            ) : (
              <Badge variant="outline">Shareholder</Badge>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-bold">{item.shares.toString()}</span> shares
            <div>{getPercent(item.shares)}</div>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl"
              disabled={space.isFounder(item.account)}
              onClick={() => {
                setState({ isOpen: true, contributor: item })
              }}
            >
              Give shares
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

function getPercent(shares: number | bigint) {
  return (
    <div className="text-sm text-neutral-500">
      ({((Number(shares) / 1_000_000) * 100).toFixed(2)}%)
    </div>
  )
}
