/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { Tag } from '@saplingdao/types'
import { slug } from 'github-slugger'
import { usePathname } from 'next/navigation'
import Link from './Link'

interface PostListWithTagProps {
  tags: Tag[]
}

export function TagList({ tags = [] }: PostListWithTagProps) {
  const pathname = usePathname()

  return (
    <div className="">
      <ul className="flex flex-wrap gap-x-5">
        {tags.map((t) => {
          return (
            <li key={t.id} className="my-3">
              {decodeURI(pathname.split('/tags/')[1]) === slug(t.name) ? (
                <h3 className="inline py-2 text-primary-500 dark:text-gray-800">
                  #{`${t.name}`}
                </h3>
              ) : (
                <Link
                  href={`/tags/${slug(t.name)}`}
                  className="py-2 text-gray-500 hover:text-primary-500 dark:text-gray-800 dark:hover:text-primary-500 rounded-full"
                  aria-label={`View posts tagged ${t.name}`}
                >
                  #{`${t.name}`}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
