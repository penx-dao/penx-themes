import { getPosts } from '@/lib/fetchers'

export default async function HomePage() {
  const posts = await getPosts()

  if (!process.env.NEXT_PUBLIC_THEME) {
    return <div>Theme not found</div>
  }

  const { HomePage } = await import(process.env.NEXT_PUBLIC_THEME!)

  if (!HomePage) {
    return <div>Theme not found</div>
  }

  return <HomePage posts={posts} authors={[]} siteMetadata={{}} />
}
