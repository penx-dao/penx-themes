import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import Link from '../components/Link'
import PageTitle from '../components/PageTitle'
import SectionContainer from '../components/SectionContainer'
import { Post } from '../types'

interface LayoutProps {
  content: CoreContent<Post>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export function PostDetailLayout({
  content,
  next,
  prev,
  children,
}: LayoutProps) {
  const { path, slug, date, title, summary } = content

  return (
    <SectionContainer>
      <article className="mt-20">
        <header className="space-y-4 pb-4">
          <PageTitle>{title}</PageTitle>
          <dl className="flex items-center gap-2">
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date)}</time>
            </dd>
            <dd>·</dd>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              {content.readingTime.text}
            </dd>
          </dl>
        </header>
        <div className="grid-rows-[auto_1fr]">
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
              {children}
            </div>
          </div>
          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && prev.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${prev.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && next.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${next.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  )
}
