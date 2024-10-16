import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'uikit'
import { StoreProvider } from '@plantreexyz/store'
import { AppProvider } from './AppProvider'
import MainApp from './MainApp'
import '@/styles/globals.css'
import '@/styles/command.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <AppProvider>
        <ToastContainer position="bottom-right" />
        <div id="portal" />
        <MainApp />
      </AppProvider>
    </StoreProvider>
  </React.StrictMode>,
)
