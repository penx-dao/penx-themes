import { cn } from '@penxio/utils'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?:string
}

export default function SectionContainer({ children, className }: Props) {
  return (
    <section className={cn("px-4 sm:px-6 xl:px-4 min-h-screen flex flex-col", className)}>
      {children}
    </section>
  )
}
