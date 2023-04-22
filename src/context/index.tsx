import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { AuthProvider } from './auth-context'
import { store } from '@/store'
// 统一提供Provider
export function AppProviders({ children }: { children: ReactNode }) {
  return (
  <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  </Provider>
  )
}
