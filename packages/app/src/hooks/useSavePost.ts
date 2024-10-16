import { writeTextFile } from '@tauri-apps/plugin-fs'
import { useDebouncedCallback } from 'use-debounce'
import { Post } from '@plantreexyz/model'

export function useSavePost() {
  const debouncedSave = useDebouncedCallback(async (post: Post) => {
    await writeTextFile(post.fullPath, post.toMarkdown())
  }, 500)
  return debouncedSave
}
