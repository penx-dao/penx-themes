'use client'

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
import { UserAvatar } from '@/components/UserAvatar'
import { useAddress } from '@/app/(creator-fi)/hooks/useAddress'
import { useShareOrders } from '@/app/(creator-fi)/hooks/useShareOrders'
import { useSpace } from '@/app/(creator-fi)/hooks/useSpace'
import { spaceAbi } from '@/lib/abi'
import { precision } from '@/lib/math'
import { shortenAddress } from '@/lib/utils'
import { wagmiConfig } from '@/lib/wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { useWriteContract } from 'wagmi'
import { useBuyShareDialog } from './BuyShareDialog/useBuyShareDialog'

export function ShareOrderList() {
  const { orders = [], isLoading, refetch } = useShareOrders()
  const { space } = useSpace()
  const address = useAddress()
  const { writeContractAsync, isPending } = useWriteContract()
  const { setIsOpen } = useBuyShareDialog()

  async function cancelOrder(orderId: bigint) {
    const hash = await writeContractAsync({
      address: space.address,
      abi: spaceAbi,
      functionName: 'cancelShareOrder',
      args: [orderId],
    })
    await waitForTransactionReceipt(wagmiConfig, { hash })
    refetch()
  }

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

  if (!orders.length) {
    return (
      <div className="mx-auto mt-2 grid gap-4 text-neutral-400 sm:w-full">No share order yet.</div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Seller</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Operation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="flex items-center gap-2">
              <div>{shortenAddress(item.seller)}</div>
              {space.isFounder(item.seller) ? (
                <Badge>Founder</Badge>
              ) : (
                <Badge variant="outline">Shareholder</Badge>
              )}
            </TableCell>
            <TableCell>{item.amount.toString()}</TableCell>
            <TableCell>{precision.toDecimal(item.price)} ETH</TableCell>
            <TableCell className="flex items-center gap-2">
              {item.seller === address && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-24 rounded-xl"
                  disabled={item.seller !== address}
                  onClick={() => {
                    // cancelOrder(item.)
                  }}
                >
                  Cancel
                </Button>
              )}
              {item.seller !== address && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-24 rounded-xl"
                  disabled={item.seller === address}
                  onClick={() => {
                    setIsOpen(true)
                  }}
                >
                  Buy
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
