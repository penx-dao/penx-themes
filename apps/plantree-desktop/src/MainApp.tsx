import { ToastContainer } from 'uikit'
import { App } from '@plantreexyz/app'
import { StoreProvider } from '@plantreexyz/store'
import { initFower } from './common/initFower'
import { useInitThemeMode } from './hooks/useInitThemeMode'
import '@glideapps/glide-data-grid/dist/index.css'
import { AppProvider } from './AppProvider'
import '@/styles/globals.css'
import '@/styles/command.scss'
import { HomePage } from './components/HomePage'

initFower()

function MainApp() {
  useInitThemeMode()

  return (
    <StoreProvider>
      <AppProvider>
        <ToastContainer position="bottom-right" />
        <HomePage></HomePage>
        <App></App>
        <div id="portal" />
      </AppProvider>
    </StoreProvider>
  )
}

export default MainApp
