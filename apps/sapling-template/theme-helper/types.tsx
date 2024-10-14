import { PropsWithChildren } from 'react'

export type Post = {
  id: string
  title: string
  description: string
  content: string
  slug: string
  type: any
  gateType: any
  image: string | null
  imageBlurhash: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
  spaceId: string
  userId: string
  listId: string | null
}

export interface HomeLayoutProps {
  path: string
}

export interface PostLayoutProps {}

export interface HomeProps {
  posts: Post[]
}

export interface AboutProps {}

export interface PostProps {
  isGated: boolean
  post: Post
}

export type Theme = {
  HomeLayout?: ({ children }: PropsWithChildren<HomeLayoutProps>) => JSX.Element
  PostLayout?: ({ children }: PropsWithChildren<PostLayoutProps>) => JSX.Element
  Home?: ({ posts }: HomeProps) => JSX.Element
  Post?: ({ post, isGated }: PostProps) => JSX.Element
  About?: ({}: AboutProps) => JSX.Element
}
