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
import { AddVestingForm } from './AddVestingForm'
import { useAddVestingDialog } from './useAddVestingDialog'

export function AddVestingDialog() {
  const { isOpen, setIsOpen } = useAddVestingDialog()
  return (
    <Dialog open={isOpen} onOpenChange={(v) => setIsOpen(v)}>
      <DialogTrigger asChild>
        <Button className="rounded-xl" onClick={() => setIsOpen(true)}>
          Add Vesting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Vesting</DialogTitle>
        </DialogHeader>
        <AddVestingForm />
      </DialogContent>
    </Dialog>
  )
}
