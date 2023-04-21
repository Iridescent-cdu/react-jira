import qs from 'qs'
import { useCallback } from 'react'
import { useAuth } from '@/context/auth-context'
import * as auth from '@/auth-provider'

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  token?: string
  data?: object
}

export async function http(endpoint: string, { data, token, headers, ...customConfig }: Config = {}) {
  const config = {
    method: 'GET',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  }

  if (config.method.toUpperCase() === 'GET')
    endpoint += `?${qs.stringify(data)}`
  else config.body = JSON.stringify(data || {})

  // axios和fetch的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout()
      window.location.reload()
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ message: '请重新登录' })
    }
    const data = await res.json()
    if (res.ok)
      return data
    else return Promise.reject(data)
  })
}

export function useHttp() {
  const { user } = useAuth()
  return useCallback((...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token }), [user?.token])
}
