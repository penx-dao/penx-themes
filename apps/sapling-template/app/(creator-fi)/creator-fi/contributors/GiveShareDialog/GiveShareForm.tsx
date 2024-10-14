'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NumberInput } from '@/app/(creator-fi)/components/NumberInput'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { UserAvatar } from '@/components/UserAvatar'
import { useContributors } from '@/app/(creator-fi)/hooks/useContributors'
import { useSpace } from '@/app/(creator-fi)/hooks/useSpace'
import { spaceAbi } from '@/lib/abi'
import { checkChain } from '@/lib/checkChain'
import { extractErrorMessage } from '@/lib/extractErrorMessage'
import { wagmiConfig } from '@/lib/wagmi'
import { zodResolver } from '@hookform/resolvers/zod'
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { toast } from 'sonner'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import { z } from 'zod'
import { useGiveShareDialog } from './useGiveShareDialog'
import LoadingDots from '@/app/(creator-fi)/loading/loading-dots'

const FormSchema = z.object({
  amount: z.string().min(1, { message: 'Share is required' }),
})

export function GiveShareForm() {
  const [isLoading, setLoading] = useState(false)
  const { setIsOpen, contributor } = useGiveShareDialog()
  const { space } = useSpace()
  const { contributors, refetch } = useContributors()
  const { address } = useAccount()
  const me = contributors.find((c) => c.account === address)!

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)
      await checkChain()

      const hash = await writeContract(wagmiConfig, {
        address: space.address as Address,
        abi: spaceAbi,
        functionName: 'transferShares',
        args: [contributor.account, BigInt(data.amount)],
      })

      await waitForTransactionReceipt(wagmiConfig, { hash })

      const contributors = await readContract(wagmiConfig, {
        address: space.address as Address,
        abi: spaceAbi,
        functionName: 'getContributors',
      })

      const from = contributors.find((c) => c.account === address)!
      const to = contributors.find((c) => c.account === contributor.account)!

      refetch()

      setIsOpen(false)
      toast.success('Give shares successfully!')
    } catch (error) {
      const msg = extractErrorMessage(error)
      toast.error(msg || 'Failed to give shares.')
    }
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <UserAvatar address={me.account} />
            <div className="text-base">{me.account.slice(0, 6)}</div>
          </div>
          <div>
            available: <span className="font-bold">{me.shares.toString()}</span> shares
          </div>
        </div>

        <div className="text-neutral-600">
          <div>You are preparing to transfer shares to:</div>
          <div className="text-sm">{contributor.account}</div>
        </div>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Share amount</FormLabel>
              <FormControl>
                <NumberInput placeholder="" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isValid}>
          {isLoading ? <LoadingDots color="#808080" /> : <p>Confirm</p>}
        </Button>
      </form>
    </Form>
  )
}
