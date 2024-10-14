'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAddress } from '@/app/(creator-fi)/hooks/useAddress'
import { useSpace } from '@/app/(creator-fi)/hooks/useSpace'
import { useVestings, Vesting } from '@/app/(creator-fi)/hooks/useVestings'
import { spaceAbi } from '@/lib/abi'
import { extractErrorMessage } from '@/lib/extractErrorMessage'
import { shortenAddress } from '@/lib/utils'
import { wagmiConfig } from '@/lib/wagmi'
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { Address } from 'viem'
import { useWriteContract } from 'wagmi'
import { useBuyShareDialog } from './BuyShareDialog/useBuyShareDialog'
import LoadingDots from '../../loading/loading-dots'

export function VestingList() {
  const { vestings = [], isLoading } = useVestings()
  const { space } = useSpace()
  const address = useAddress()

  if (isLoading) {
    return (
      <div className="mt-2 grid gap-4">
        {Array(5)
          .fill('')
          .map((_, i) => (
            <Skeleton key={i} className="h-[60px] rounded-lg" />
          ))}
      </div>
    )
  }

  if (!vestings.length) {
    return (
      <div className="mx-auto mt-2 grid gap-4 text-neutral-400 sm:w-full">No share order yet.</div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Payer</TableHead>
          <TableHead>Beneficiary</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>Allocation</TableHead>
          <TableHead>Operation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vestings.map((item) => (
          <TableRow key={item.beneficiary}>
            <TableCell className="flex items-center gap-2">
              <div>{shortenAddress(item.payer)}</div>
              {space.isFounder(item.payer) ? (
                <Badge>Founder</Badge>
              ) : (
                <Badge variant="outline">Shareholder</Badge>
              )}
            </TableCell>
            <TableCell>{shortenAddress(item.beneficiary)}</TableCell>
            <TableCell>{format(new Date(Number(item.start) * 1000), 'yyyy-MM-dd')}</TableCell>
            <TableCell>{item.allocation.toString()} shares</TableCell>
            <TableCell>
              {item.payer === address && <CancelVestingButton beneficiary={item.beneficiary} />}
              {item.payer !== address && <ClaimVestingButton beneficiary={item.beneficiary} />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function CancelVestingButton({ beneficiary }: { beneficiary: Address }) {
  const { space } = useSpace()
  const { refetch } = useVestings()
  const [loading, setLoading] = useState(false)

  return (
    <Button
      size="sm"
      variant="outline"
      className="w-20 rounded-xl"
      onClick={async () => {
        try {
          setLoading(true)
          const hash = await writeContract(wagmiConfig, {
            address: space.address,
            abi: spaceAbi,
            functionName: 'removeVesting',
            args: [beneficiary],
          })
          await waitForTransactionReceipt(wagmiConfig, { hash })
          await refetch()
          toast.success('Cancel vesting successfully!')
        } catch (error) {
          const msg = extractErrorMessage(error)
          toast.error(msg)
        }
        setLoading(false)
      }}
    >
      {loading ? <LoadingDots></LoadingDots> : 'Cancel'}
    </Button>
  )
}

function ClaimVestingButton({ beneficiary }: { beneficiary: Address }) {
  const { space } = useSpace()
  const { refetch } = useVestings()
  const [loading, setLoading] = useState(false)
  const address = useAddress()

  return (
    <Button
      size="sm"
      variant="outline"
      className="w-24 rounded-xl"
      disabled={loading || address !== beneficiary}
      onClick={async () => {
        try {
          setLoading(true)
          const hash = await writeContract(wagmiConfig, {
            address: space.address,
            abi: spaceAbi,
            functionName: 'claimVesting',
          })
          await waitForTransactionReceipt(wagmiConfig, { hash })
          await refetch()
          toast.success('Claim share successfully!')
        } catch (error) {
          const msg = extractErrorMessage(error)
          toast.error(msg)
        }
        setLoading(false)
      }}
    >
      {loading ? <LoadingDots></LoadingDots> : 'Claim share'}
    </Button>
  )
}
