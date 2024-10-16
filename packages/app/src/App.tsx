import { Box } from '@fower/react'
import { useRouter } from '@plantreexyz/hooks'
import { Main } from './components/Main'
import { PostDetail } from './components/PostDetail/PostDetail'
import { Sidebar } from './components/Sidebar/Sidebar'

export const App = () => {
  const router = useRouter()

  return (
    <Box h-100vh toLeft rounded2XL>
      <div>GOGO</div>
    </Box>
  )
}
