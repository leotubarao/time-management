import React from 'react'

import Components from './components'

export const AppContainer: React.FC = () => (
  <div className="App m-4 sm:m-6 lg:m-8">
    <Components.Header />
    <Components.TimeList.Root />
  </div>
)
