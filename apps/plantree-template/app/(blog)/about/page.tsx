import { getSite } from '@/lib/fetchers'

export default async function HomePage() {
  const [site] = await Promise.all([getSite()])

  if (!process.env.NEXT_PUBLIC_THEME) {
    return <div>Theme not found</div>
  }

  const { AboutPage } = await import(process.env.NEXT_PUBLIC_THEME!)

  if (!AboutPage) {
    return <div>Theme not found</div>
  }

  return <AboutPage site={site} />
}
