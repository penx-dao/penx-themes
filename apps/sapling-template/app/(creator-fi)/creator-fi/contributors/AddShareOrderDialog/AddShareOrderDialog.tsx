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
import { AddShareOrderForm } from './AddShareOrderForm'
import { useAddShareOrderDialog } from './useAddShareOrderDialog'

export function AddShareOrderDialog() {
  const { isOpen, setIsOpen } = useAddShareOrderDialog()
  return (
    <Dialog open={isOpen} onOpenChange={(v) => setIsOpen(v)}>
      <DialogTrigger asChild>
        <Button className="rounded-xl" onClick={() => setIsOpen(true)}>
          Add Share Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Share Order</DialogTitle>
        </DialogHeader>
        <AddShareOrderForm />
      </DialogContent>
    </Dialog>
  )
}
