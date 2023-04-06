import type { ReactNode } from 'react'
import { AuthProvider } from './auth-context'

// 统一提供Provider
export function AppProviders({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
