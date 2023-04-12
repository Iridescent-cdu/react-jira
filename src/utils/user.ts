import { useEffect } from 'react'
import { useAsync } from './use-async'
import { useHttp } from './http'
import { cleanObject } from '.'
import type { User } from '@/screens/project-list/search-panel'

export function useUsers(param?: Partial<User>) {
  const client = useHttp()
  const { run, ...result } = useAsync<User[]>()
  useEffect(() => {
    run(client('users', { data: cleanObject(param || {}) }))
  }, [param])
  return result
}
