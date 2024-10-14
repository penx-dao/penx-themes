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
import { useShareOrders } from '@/app/(creator-fi)/hooks/useShareOrders'
import { useSpace } from '@/app/(creator-fi)/hooks/useSpace'
import { spaceAbi } from '@/lib/abi'
import { checkChain } from '@/lib/checkChain'
import { extractErrorMessage } from '@/lib/extractErrorMessage'
import { precision } from '@/lib/math'
import { wagmiConfig } from '@/lib/wagmi'
import { zodResolver } from '@hookform/resolvers/zod'
import { writeContract } from '@wagmi/core'
import { toast } from 'sonner'
import { Address } from 'viem'
import { z } from 'zod'
import { useBuyShareDialog } from './useBuyShareDialog'
import LoadingDots from '@/app/(creator-fi)/loading/loading-dots'

const FormSchema = z.object({
  amount: z.string().min(1, { message: 'Amount is required' }),
})

export function BuyShareForm() {
  const [isLoading, setLoading] = useState(false)
  const { setIsOpen } = useBuyShareDialog()
  const { space } = useSpace()
  const { orders = [], refetch } = useShareOrders()

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

      await writeContract(wagmiConfig, {
        address: space.address as Address,
        abi: spaceAbi,
        functionName: 'executeShareOrder',
        args: [BigInt(0), BigInt(data.amount)],
      })

      refetch()

      setIsOpen(false)
      toast.success('Add Contributor successfully!')
    } catch (error) {
      console.log('error:', error)

      const msg = extractErrorMessage(error)
      toast.error(msg || 'Failed to add Contributor. Please try again.')
    }
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <NumberInput placeholder="" precision={0} {...field} className="w-full" />
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
