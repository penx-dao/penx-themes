import React, { useEffect } from 'react'
import { Box } from '@fower/react'
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/kit/core'
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener'
import { commonmark } from '@milkdown/kit/preset/commonmark'
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react'
import { nord } from '@milkdown/theme-nord'
import { usePosts } from '@plantreexyz/hooks'
import { useSavePost } from '../../hooks/useSavePost'

const MilkdownEditor = ({ content }: { content: string }) => {
  const { activePost } = usePosts()
  const savePost = useSavePost()

  const { get } = useEditor((root) =>
    Editor.make()
      .config(nord)
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, content)
      })
      .use(commonmark)
      .use(listener),
  )

  useEffect(() => {
    const editor = get()
    if (editor) {
      editor.action((ctx) => {
        //
        ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
          // console.log('markdown updated:', markdown)
          activePost.updateContent(markdown)
          savePost(activePost)
        })
      })
    }
  }, [get, savePost, activePost])

  // useEffect(() => {
  //   const editor = get()
  //   if (editor && content) {
  //     editor.ctx.set(defaultValueCtx, content)
  //     editor.ctx.set(rootCtx, content)
  //   }
  // }, [content, get])

  return <Milkdown />
}

interface Props {}

export function PostContent({}: Props) {
  const { activePost } = usePosts()

  return (
    <Box minH-80vh neutral700 leadingNormal textLG pb20>
      <MilkdownProvider>
        <MilkdownEditor content={activePost.content} />
      </MilkdownProvider>
    </Box>
  )
}
