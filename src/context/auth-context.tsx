import type { ReactNode } from 'react'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import * as auth from '@/auth-provider'
import type { User } from '@/screens/project-list/search-panel'
import { http } from '@/utils/http'
import { useMount } from '@/utils'
import { useAsync } from '@/utils/use-async'
import { FUllPageErrorFallback, FullPageLoading } from '@/components/lib'
import * as authStore from '@/store/auth.slice'
import { useAppDispatch } from '@/store'

export interface AuthForm {
  username: string
  password: string
}

export async function bootstrapUser() {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

// 封装AuthContext.Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const { error, isLoading, isIdle, isError, isSuccess, run, setData: setUser } = useAsync<User | null>()
  const dispatch: (...args: unknown[]) => Promise<User> = useAppDispatch()
  useMount(() => {
    run(dispatch(authStore.bootstrap()))
  })
  if (isIdle || isLoading)
    return <FullPageLoading></FullPageLoading>
  if (isError)
    return <FUllPageErrorFallback error={error} />

  return <div>
    {children}
  </div>
}

// 封装useContext(AuthContext)
export function useAuth() {
  const dispatch = useAppDispatch()
  const user = useSelector(authStore.selectUser)
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
  return {
    user,
    login,
    register,
    logout,
  }
}
