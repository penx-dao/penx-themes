import ReactMarkdown from 'react-markdown'
import { Box, css } from '@fower/react'

interface Props {
  content: string
}

export const Markdown = ({ content }: Props) => {
  return (
    <ReactMarkdown
      className={css(['p1'])}
      components={{
        h1: (props) => {
          return <Box as="h1" mb2 {...props} />
        },
        h2: (props) => {
          return <Box as="h2" mb2 {...props} />
        },
        ul: (props) => {
          return <Box as="ul" pl2 listInside listDisc {...(props as any)} />
        },
        li: (props) => {
          return <Box as="li" py1 {...(props as any)} />
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
