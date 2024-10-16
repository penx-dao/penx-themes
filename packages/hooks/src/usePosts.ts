import { resolve } from '@tauri-apps/api/path'
import { writeTextFile } from '@tauri-apps/plugin-fs'
import { useAtom } from 'jotai'
import { Post } from '@plantreexyz/model'
import { postsAtom, store } from '@plantreexyz/store'
import { uniqueId } from '@plantreexyz/unique-id'
import { useRouter } from './useRouter'
import { useTrees } from './useTrees'

const content = `---
title: ""
description: ""
pubDate: "${new Date().toISOString()}"
createdAt: "${new Date().toISOString()}"
---


`
export function usePosts() {
  const { trees } = useTrees()
  const [posts, setPosts] = useAtom(postsAtom)
  const { postFileName } = useRouter()

  async function createPost() {
    const tree = trees[0]
    const fileName = uniqueId() + '.md'
    const newPostPath = await resolve(
      tree.treeRootDir,
      tree.name,
      'src/content/blog',
      fileName,
    )
    const post = new Post(newPostPath, content)
    setPosts([...posts, post])
    store.router.routeTo('POST', { fileName })
    await writeTextFile(post.fullPath, post.toMarkdown())
  }

  return {
    posts,
    activePost: posts.find((post) => post.fileName === postFileName)!,
    createPost,
    setPosts,
  }
}
