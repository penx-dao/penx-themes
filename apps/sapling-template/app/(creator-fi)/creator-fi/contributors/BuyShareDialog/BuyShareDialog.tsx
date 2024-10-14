import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { BuyShareForm } from './BuyShareForm'
import { useBuyShareDialog } from './useBuyShareDialog'

export function BuyShareDialog() {
  const { isOpen, setIsOpen } = useBuyShareDialog()
  return (
    <Dialog open={isOpen} onOpenChange={(v) => setIsOpen(v)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy Shares</DialogTitle>
        </DialogHeader>
        <BuyShareForm />
      </DialogContent>
    </Dialog>
  )
}
