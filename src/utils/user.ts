import { useQuery } from 'react-query'
import { useHttp } from './http'

import type { User } from '@/types/user'

export function useUsers(param?: Partial<User>) {
  const client = useHttp()

  return useQuery<User[]>(['users', param], () =>
    client('users', { data: param }),
  )
}
