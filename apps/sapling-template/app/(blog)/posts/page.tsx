import { getPosts } from '@/lib/fetchers'

export default async function Page() {
  const posts = await getPosts()

  if (!process.env.NEXT_PUBLIC_THEME) {
    return <div>Theme not found</div>
  }

  const { BlogPage } = await import(process.env.NEXT_PUBLIC_THEME!)

  if (!BlogPage) {
    return <div>Theme not found</div>
  }

  return <BlogPage posts={posts} authors={[]} siteMetadata={{}} />
}
