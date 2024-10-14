import HomeMain from '../components/Main'

interface Props {
  posts: any[]
}

export function HomePage({ posts }: Props) {
  return <HomeMain posts={posts} />
}
