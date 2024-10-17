'use client'

import { extractErrorMessage } from '@/lib/extractErrorMessage'
import { trpc } from '@/lib/trpc'
import { toast } from 'sonner'
import { RoleSection } from './RoleSection'

export default function Page() {
  const {
    isLoading: isAdminListLoading,
    data: adminList,
    refetch: refetchAdminList,
  } = trpc.user.listAdminUser.useQuery()

  const {
    isLoading: isAuthorListLoading,
    data: authorList,
    refetch: refetchAuthorList,
  } = trpc.user.listAuthorUser.useQuery()

  const { mutateAsync: adminSetmutateAsync } =
    trpc.user.setRoleToAdmin.useMutation()
  const { mutateAsync: authorSetmutateAsync } =
    trpc.user.setRoleToAuthor.useMutation()
  const { mutateAsync: readerSetmutateAsync } =
    trpc.user.setRoleToReader.useMutation()

  const inviteUserToRole = async (
    mutateAsync: any,
    address: string,
    role: string,
  ) => {
    try {
      await mutateAsync({ address })
      refetchAdminList()
      refetchAuthorList()
      toast.success(`User invited to ${role} role`)
    } catch (error) {
      const msg = extractErrorMessage(error)
      toast.error(msg)
    }
  }

  return (
    <div className="flex flex-col justify-between space-y-8">
      <RoleSection
        title="Admin role"
        description="Users with the Admin role can manage the site."
        users={adminList}
        isLoading={isAdminListLoading}
        onInvite={(address) =>
          inviteUserToRole(adminSetmutateAsync, address, 'admin')
        }
        onRemove={(address) =>
          inviteUserToRole(readerSetmutateAsync, address, 'reader')
        }
      />

      <RoleSection
        title="Author role"
        description="Users with the Author role can write articles."
        users={authorList}
        isLoading={isAuthorListLoading}
        onInvite={(address) =>
          inviteUserToRole(authorSetmutateAsync, address, 'author')
        }
        onRemove={(address) =>
          inviteUserToRole(readerSetmutateAsync, address, 'reader')
        }
      />
    </div>
  )
}