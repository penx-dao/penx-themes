import * as React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Trash2 } from 'lucide-react'
import { useDeleteConfirmDialog } from './useDeleteConfirmDialog'

interface Props {
  title: string
  content: string
  onConfirm: () => void
}

export function DeleteConfirmDialog({ title, content, onConfirm }: Props) {
  const { isOpen, setIsOpen } = useDeleteConfirmDialog()

  return (
    <AlertDialog open={isOpen} onOpenChange={(v) => setIsOpen(v)}>
      <AlertDialogTrigger asChild>
        <TooltipProvider delayDuration={50}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Trash2
                className="h-4 w-4 cursor-pointer text-destructive hover:text-destructive/90"
                onClick={() => setIsOpen(true)}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>remove admin role</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
