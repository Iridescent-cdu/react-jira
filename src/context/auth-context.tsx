import type { ReactNode } from 'react'
import React, { useContext, useState } from 'react'
import * as auth from '@/auth-provider'
import type { User } from '@/screens/project-list/search-panel'
import { http } from '@/utils/http'
import { useMount } from '@/utils'

interface AuthForm {
  username: string
  password: string
}

async function bootstrapUser() {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

// 创建一个AuthContext
const AuthContext = React.createContext<
  | {
      user: User | null
      register: (form: AuthForm) => Promise<void>
      login: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)

// 指定Context名称
AuthContext.displayName = 'AuthContext'

// 封装AuthContext.Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  // Point free
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then((user: User) => setUser(user))
  const logout = () => auth.logout().then(() => setUser(null))
  useMount(() => {
    bootstrapUser().then(setUser)
  })
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}

// 封装useContext(AuthContext)
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth必须在AuthProvider中使用')
  return context
}
