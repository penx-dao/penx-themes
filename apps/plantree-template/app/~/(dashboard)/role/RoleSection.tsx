import { useState } from 'react'
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog/DeleteConfirmDialog'
import LoadingDots from '@/components/icons/loading-dots'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { User } from '@prisma/client'

interface RoleSectionProps {
  title: string
  description: string
  users: User[] | undefined
  isLoading: boolean
  onInvite: (address: string) => Promise<void>
  onRemove: (address: string) => Promise<void>
}

export const RoleSection: React.FC<RoleSectionProps> = ({
  title,
  description,
  users,
  isLoading,
  onInvite,
  onRemove,
}) => {
  const [invitedAddress, setInvitedAddress] = useState('')

  const handleInvite = async () => {
    if (!invitedAddress.trim()) return
    await onInvite(invitedAddress)
    setInvitedAddress('')
  }

  return (
    <div className="flex flex-col">
      <div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground my-1">{description}</p>
        <Separator className="my-4" />
      </div>

      <div className="flex w-full max-w-md items-center space-x-2">
        <Input
          placeholder="Enter wallet address"
          value={invitedAddress}
          onChange={(e) => setInvitedAddress(e.target.value)}
        />
        <Button variant="outline" onClick={handleInvite}>
          Invite
        </Button>
      </div>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Address</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Operations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                <LoadingDots />
              </TableCell>
            </TableRow>
          ) : users && users.length > 0 ? (
            users?.map((user) => (
              <TableRow key={user.id} className="text-muted-foreground">
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell className="flex space-x-3 justify-center">
                  <DeleteConfirmDialog
                    title="Confirm Delete"
                    content="Are you sure you want to delete this item?"
                    onConfirm={() => onRemove(user.address)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-muted-foreground"
              >
                No records found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
