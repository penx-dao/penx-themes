'use client'

import { Button } from '@/components/ui/button'
import { TipTokenDialog } from './TipTokenDialog'
import { useTipTokenDialog } from './useTipTokenDialog'

interface Props {
  slug: string
}

export function TipTokenButton({ slug }: Props) {
  const { setIsOpen } = useTipTokenDialog()
  return (
    <>
      <TipTokenDialog />
      <Button
        size="sm"
        variant="secondary"
        className="rounded-xl text-sm"
        onClick={() => setIsOpen(true)}
      >
        Tip $TREE
      </Button>
    </>
  )
}
