import React from 'react'

import UnAuthenticated from './screens/unauthenticated-app/index'
import { useAuth } from './context/auth-context'
import AuthenticatedApp from './screens/authenticated-app/authenticated-app'

function App() {
  const { user } = useAuth()
  return <div className="App">{user ? <AuthenticatedApp /> : <UnAuthenticated />}</div>
}

export default App
