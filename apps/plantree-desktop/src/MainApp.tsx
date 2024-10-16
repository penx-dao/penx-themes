import { useRouter } from '@plantreexyz/hooks'
import { initFower } from './common/initFower'
import { HomePage } from './components/HomePage'
import { SpacePage } from './components/SpacePage'

initFower()

function MainApp() {
  const { name } = useRouter()
  return (
    <div>
      {name === 'HOME' && <HomePage />}
      {name === 'SPACE_HOME' && <SpacePage />}
    </div>
  )
}

export default MainApp
