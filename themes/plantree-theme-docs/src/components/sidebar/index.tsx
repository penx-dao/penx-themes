'use client'

import { usePathname } from 'next/navigation'
import { DocSidebarDesktop } from './desktop'

interface Props {
  siteMetadata: any
}

export interface ISidebar {
  href: string
  label: string
  type?: 'category' | 'link'
  items?: ISidebar[]
}

export const sidebar: ISidebar[] = [
  {
    label: 'code-sample',
    href: '/posts/code-sample',
  },
  {
    label: 'deriving-ols-estimator',
    href: '/posts/deriving-ols-estimator',
  },
  {
    label: 'github-markdown-guide',
    href: '/posts/github-markdown-guide',
  },
  {
    label: 'guide-to-using-images-in-nextjs',
    href: '/posts/guide-to-using-images-in-nextjs',
  },
  {
    label: 'introducing-tailwind-nextjs-starter-blog',
    href: '/posts/introducing-tailwind-nextjs-starter-blog',
  },
  {
    label: 'my-fancy-title',
    href: '/posts/my-fancy-title',
  },
  {
    label: 'new-features-in-v1',
    href: '/posts/new-features-in-v1',
  },
  {
    label: 'pictures-of-canada',
    href: '/posts/pictures-of-canada',
  },
  {
    label: 'release-of-tailwind-nextjs-starter-blog-v2.0',
    href: '/posts/release-of-tailwind-nextjs-starter-blog-v2.0',
  },
  {
    label: 'machine',
    href: 'the-time-machine',
    type: 'category',
    items: [
      {
        label: 'pictures-of-canada',
        href: '/posts/pictures-of-canada',
      },
      {
        label: 'the-time-machine',
        href: '/posts/the-time-machine',
      },
      {
        label: 'machine',
        href: 'the-time-machine',
        type: 'category',
        items: [
          {
            label: 'my-fancy-title',
            href: '/posts/my-fancy-title',
          },
        ],
      },
    ],
  },
  {
    label: 'nested-route',
    href: '/posts/nested-route',
    type: 'category',
    items: [
      {
        href: '/posts/nested-route/introducing-multi-part-posts-with-nested-routing',
        label: 'test',
      },
    ],
  },
]

export const Sidebar = ({ siteMetadata }: Props) => {
  const activePath = usePathname()
  console.log('========pathname:', { activePath, siteMetadata })

  return (
    <aside className="w-[300px] bg-slate-100 px-3 hidden md:block h-screen sticky top-0">
      <DocSidebarDesktop activePath={activePath} sidebar={sidebar} />
    </aside>
  )
}
