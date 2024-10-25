import { slug } from 'github-slugger'
import Link from 'next/link'
import { PostTag } from '@plantreexyz/types'
import { cn } from '@plantreexyz/utils'

interface Props {
  postTag: PostTag
  className?: string
}

const Tag = ({ postTag, className }: Props) => {
  return (
    <Link
      href={`/tags/${slug(postTag.tag.name)}`}
      className={cn(
        'mr-3 text-base font-medium text-brand-500 hover:text-brand-600 dark:hover:text-brand-400',
        className,
      )}
    >
      {postTag.tag.name.split(' ').join('-')}
    </Link>
  )
}

export default Tag
