'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NumberInput } from '@/app/(creator-fi)/components/NumberInput'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSpace } from '@/app/(creator-fi)/hooks/useSpace'
import { useVestings } from '@/app/(creator-fi)/hooks/useVestings'
import { spaceAbi } from '@/lib/abi'
import { checkChain } from '@/lib/checkChain'
import { extractErrorMessage } from '@/lib/extractErrorMessage'
import { wagmiConfig } from '@/lib/wagmi'
import { zodResolver } from '@hookform/resolvers/zod'
import { writeContract } from '@wagmi/core'
import { toast } from 'sonner'
import { Address } from 'viem'
import { z } from 'zod'
import { useAddVestingDialog } from './useAddVestingDialog'
import LoadingDots from '@/app/(creator-fi)/loading/loading-dots'
import { SECONDS_PER_DAY } from '@/app/(creator-fi)/constants'

const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/

const FormSchema = z.object({
  beneficiary: z
    .string()
    .min(1, { message: 'Address is required' })
    .regex(ethAddressRegex, { message: 'Invalid Ethereum address' }),
  allocation: z.string().min(1, { message: 'Price is required' }),
  duration: z.string().min(1, { message: 'Amount is required' }),
})

export function AddVestingForm() {
  const [isLoading, setLoading] = useState(false)
  const { setIsOpen } = useAddVestingDialog()
  const { space } = useSpace()
  const { refetch } = useVestings()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      beneficiary: '',
      duration: '',
      allocation: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)
      await checkChain()

      await writeContract(wagmiConfig, {
        address: space.address as Address,
        abi: spaceAbi,
        functionName: 'addVesting',
        args: [
          data.beneficiary as Address,
          BigInt(Math.floor(Date.now() / 1000)),
          BigInt(Number(data.duration)) * SECONDS_PER_DAY,
          BigInt(data.allocation),
        ],
      })

      refetch()

      setIsOpen(false)
      toast.success('Add vesting successfully!')
    } catch (error) {
      console.log('error:', error)

      const msg = extractErrorMessage(error)
      toast.error(msg || 'Failed to add vesting. Please try again.')
    }
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="beneficiary"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Beneficiary</FormLabel>
              <FormControl>
                <Input placeholder="0x..." {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allocation"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Allocation</FormLabel>
              <FormDescription>
                The shares amount to be allocated to the beneficiary.
              </FormDescription>
              <FormControl>
                <NumberInput placeholder="" precision={0} {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Duration</FormLabel>
              <FormDescription>The allocation duration in days.</FormDescription>
              <FormControl>
                <NumberInput placeholder="" precision={10} {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isValid}>
          {isLoading ? <LoadingDots color="#808080" /> : <p>Add</p>}
        </Button>
      </form>
    </Form>
  )
}
