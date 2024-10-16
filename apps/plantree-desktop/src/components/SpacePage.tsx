import { ChevronLeft } from 'lucide-react'
import { useRouter } from '@plantreexyz/hooks'
import { store } from '@plantreexyz/store'

interface Props {}

export const SpacePage = ({}: Props) => {
  const { params } = useRouter()

  return (
    <div className="h-screen bg-amber-50">
      <ChevronLeft
        className="cursor-pointer"
        onClick={() => {
          store.router.routeTo('HOME')
        }}
      ></ChevronLeft>
      <div>Space</div>
    </div>
  )
}
