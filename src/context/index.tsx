import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from './auth-context'
// 统一提供Provider
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}
