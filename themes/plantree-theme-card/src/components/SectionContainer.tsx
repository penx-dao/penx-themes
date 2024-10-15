import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto px-4 sm:px-6 lg:max-w-5xl xl:px-0 min-h-screen flex flex-col pb-20">
      {children}
    </section>
  )
}
