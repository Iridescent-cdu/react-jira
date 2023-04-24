import { useQuery } from 'react-query'
import { useHttp } from '@/utils/http'
import type { Task } from '@/types/task'

export function useTasks(param?: Partial<Task>) {
  const client = useHttp()
  return useQuery<Task[]>(['tasks', param], () => client('tasks', {
    data: param,
  }))
}
