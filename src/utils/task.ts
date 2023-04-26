import type { QueryKey } from 'react-query'
import { useMutation, useQuery } from 'react-query'
import { useHttp } from '@/utils/http'
import type { Task } from '@/types/task'
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig,
} from '@/utils/use-optimistic-options'

export function useTasks(param?: Partial<Task>) {
  const client = useHttp()
  return useQuery<Task[]>(['tasks', param], () => client('tasks', {
    data: param,
  }))
}
export function useAddTask(queryKey: QueryKey) {
  const client = useHttp()

  return useMutation((params: Partial<Task>) => client('tasks', {
    data: params,
    method: 'POST',
  }),
  useAddConfig(queryKey))
}
export function useTask(id?: number) {
  const client = useHttp()
  return useQuery<Task>(
    ['task', { id }],
    () => client(`tasks/${id}`), {
      enabled: Boolean(id),
    })
}
export function useEditTask(queryKey: QueryKey) {
  const client = useHttp()
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    useEditConfig(queryKey),
  )
}
export function useDeleteTask(queryKey: QueryKey) {
  const client = useHttp()
  return useMutation((params: Partial<Task>) => client(`tasks/${params.id}`, {
    method: 'DELETE',
  }),
  useDeleteConfig(queryKey))
}
export interface SortProps {
  // 要重新排序的item
  fromId: number
  // 目标item
  referenceId: number
  // 放在目标item的前还是后
  type: 'before' | 'after'
  fromKanbanId?: number
  toKanbanId?: number
}
export function useReorderTask(queryKey: QueryKey) {
  const client = useHttp()
  return useMutation((params: SortProps) => client('tasks/reorder', {
    data: params,
    method: 'POST',
  }),
  useReorderTaskConfig(queryKey),
  )
}
