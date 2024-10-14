/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { slug } from 'github-slugger'
import { usePathname } from 'next/navigation'
import Link from './Link'

interface PostListWithTagProps {
  tagData: Record<string, number>
  title?: string
}

export function TagList({ tagData = {}, title }: PostListWithTagProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="">
      <ul className="flex flex-wrap gap-x-5">
        {sortedTags.map((t) => {
          return (
            <li key={t} className="my-3">
              {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                <h3 className="inline py-2 text-primary-500 dark:text-gray-800">
                  {`${t} (${tagCounts[t]})`}
                </h3>
              ) : (
                <Link
                  href={`/tags/${slug(t)}`}
                  className="py-2 text-gray-500 hover:text-primary-500 dark:text-gray-800 dark:hover:text-primary-500 rounded-full"
                  aria-label={`View posts tagged ${t}`}
                >
                  {`${t} (${tagCounts[t]})`}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
