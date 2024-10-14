import { slug } from 'github-slugger'
import Link from 'next/link'
import { cn } from '../lib/utils'

interface Props {
  text: string
  className?: string
}

const Tag = ({ text, className }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={cn(
        'mr-3 text-base font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400',
        className,
      )}
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
