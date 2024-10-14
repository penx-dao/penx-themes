'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAddress } from '@/app/(creator-fi)/hooks/useAddress'
import { useContributors } from '@/app/(creator-fi)/hooks/useContributors'
import { useSpace } from '@/app/(creator-fi)/hooks/useSpace'
import { spaceAbi } from '@/lib/abi'
import { checkChain } from '@/lib/checkChain'
import { extractErrorMessage } from '@/lib/extractErrorMessage'
import { precision } from '@/lib/math'
import { wagmiConfig } from '@/lib/wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { toast } from 'sonner'
import { Address } from 'viem'
import { useReadContract, useWriteContract } from 'wagmi'
import LoadingDots from '../../loading/loading-dots'

interface Props {}

export function ClaimShareRewards({}: Props) {
  const address = useAddress()
  const { space } = useSpace()
  const { data, isLoading, refetch } = useReadContract({
    address: space.address as Address,
    abi: spaceAbi,
    functionName: 'currentContributorRewards',
    args: [address],
  })

  const { contributors, isLoading: isLoadingContributors } = useContributors()
  const isShareHolder = contributors.some((c) => c.account === address)
  const { writeContractAsync, isPending } = useWriteContract()

  if (isLoading || isLoadingContributors || typeof data === 'undefined') {
    return (
      <div className="flex h-20 w-72 flex-col gap-2 ">
        <Skeleton className="w-36 flex-[1]"></Skeleton>
        <Skeleton className="flex-[2]"></Skeleton>
      </div>
    )
  }

  return (
    <div className="h-20 space-y-2">
      <div className="font-semibold">Space rewards</div>
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          className="w-24 rounded-xl"
          onClick={async () => {
            try {
              if (!isShareHolder) {
                return toast.warning('Only available for shareholders.')
              }
              await checkChain()
              const hash = await writeContractAsync({
                address: space.address as Address,
                abi: spaceAbi,
                functionName: 'claimShareRewards',
              })

              await waitForTransactionReceipt(wagmiConfig, { hash })
              refetch()
              toast.success('Rewards claimed successfully!')
            } catch (error) {
              const msg = extractErrorMessage(error)
              toast.error(msg || 'Failed to claim rewards')
            }
          }}
        >
          {isPending ? <LoadingDots color="white" /> : <div>Claim</div>}
        </Button>
        <div className="text-green-500">
          + {precision.toDecimal(data).toFixed(2)} {space.symbolName}
        </div>
      </div>
    </div>
  )
}
