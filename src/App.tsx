import React from 'react'
import '@/App.css'
import UnAuthenticated from './screens/unauthenticated-app/index'
import { useAuth } from './context/auth-context'
import AuthenticatedApp from './screens/authenticated-app/authenticated-app'
import { FUllPageErrorFallback } from './components/lib'
import { ErrorBoundary } from '@/components/error-boundary'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FUllPageErrorFallback}></ErrorBoundary>
      {/* 发生错误将卸载AuthenticatedApp和UnAuthenticated组件，改用我们的错误处理组件 */}
      {user ? <AuthenticatedApp /> : <UnAuthenticated />}
    </div>
  )
}

export default App
