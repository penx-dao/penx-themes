'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Post } from '@/hooks/usePost'
import { extractErrorMessage } from '@/lib/extractErrorMessage'
import { trpc } from '@/lib/trpc'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface PostHeaderProps {
  post: Post
  setData: Dispatch<SetStateAction<Post>>
}
export function Tags({ post, setData }: PostHeaderProps) {
  const [value, setValue] = useState('')
  const { mutateAsync } = trpc.tag.create.useMutation()
  return (
    <div className="flex items-center gap-2">
      <div>Tags...</div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="xs"
            variant="outline"
            className="rounded-full gap-1 text-zinc-500 text-xs"
          >
            <Plus size={16}></Plus>
            <div>Add tag</div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-0">
          <div className="border-b">
            <Input
              size="sm"
              placeholder="Find or create"
              className="outline-none focus-visible:ring-0 border-none border-b"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  console.log('value======:', value)
                  try {
                    await mutateAsync({
                      postId: post.id,
                      name: value,
                    })
                  } catch (error) {
                    const msg = extractErrorMessage(error)
                    toast.error(msg || 'Error adding tag')
                  }
                }
              }}
            />
          </div>
          <DropdownMenuItem onClick={() => {}}>System</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
