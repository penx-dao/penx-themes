'use client'

import { PostStatus } from '@/lib/constants'
import { RouterOutputs } from '@/server/_app'
import { store } from '@/store'
import { atom, useAtom } from 'jotai'

export type Post = RouterOutputs['post']['list']['0']

export const postAtom = atom<Post>(null as any as Post)

export function usePost() {
  const [post, setPost] = useAtom(postAtom)
  return { post, setPost }
}

export function updatePostPublishStatus() {
  const post = store.get(postAtom)
  store.set(postAtom, {
    ...post,
    status: PostStatus.PUBLISHED,
    publishedAt: new Date(),
  })
}
