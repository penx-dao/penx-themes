'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { cn } from '@penxio/utils'

interface Props {}

export const PostTypeNav = ({}: Props) => {
  const param = useSearchParams()
  const type = param.get('type')

  return (
    <div className="flex items-center text-sm gap-5 text-foreground/40">
      <Link href="/" className={cn(!type && 'text-foreground')}>
        All
      </Link>
      <Link
        href="/?type=articles"
        className={cn(type === 'articles' && 'text-foreground')}
      >
        Articles
      </Link>
      <Link
        href="/?type=notes"
        className={cn(type === 'notes' && 'text-foreground')}
      >
        Notes
      </Link>
      <Link
        href="/?type=photos"
        className={cn(type === 'photos' && 'text-foreground')}
      >
        Photos
      </Link>
    </div>
  )
}
