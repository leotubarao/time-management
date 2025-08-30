import React from 'react'
import { createRoot } from 'react-dom/client'

import { GlobalProvider } from './providers/Global'
import { AppContainer } from './AppContainer'

import './styles/index.css'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <GlobalProvider>
      <AppContainer />
    </GlobalProvider>
  </React.StrictMode>
)
