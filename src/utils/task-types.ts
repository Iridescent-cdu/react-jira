import { useQuery } from 'react-query'
import { useHttp } from '@/utils/http'
import type { TaskType } from '@/types/task.type'

export function useTaskTypes() {
  const client = useHttp()
  return useQuery<TaskType[]>(['taskTypes'], () => client('taskTypes'))
}
