import type { ReactNode } from 'react'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from './auth-context'

export function AppProviders({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}
