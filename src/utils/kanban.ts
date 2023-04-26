import type { QueryKey } from 'react-query'
import { useMutation, useQuery } from 'react-query'
import { useHttp } from '@/utils/http'
import type { Kanban } from '@/types/kanban'
import {
  useAddConfig,
  useDeleteConfig,
  useReorderKanbanConfig,
} from '@/utils/use-optimistic-options'

export function useKanbans(param?: Partial<Kanban>) {
  const client = useHttp()
  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', {
    data: param,
  }))
}
export function useAddKanban(queryKey: QueryKey) {
  const client = useHttp()

  return useMutation((params: Partial<Kanban>) => client('kanbans', {
    data: params,
    method: 'POST',
  }),
  useAddConfig(queryKey))
}
export function useDeleteKanban(queryKey: QueryKey) {
  const client = useHttp()
  return useMutation((params: Partial<Kanban>) => client(`kanbans/${params.id}`, {
    method: 'DELETE',
  }),
  useDeleteConfig(queryKey))
}
/* 我们把fromId的项目放在referenceId的前面或后面 */
export interface SortProps {
  // 要重新排序的item
  fromId: number
  // 目标item
  referenceId: number
  // 放在目标item的前还是后
  type: 'before' | 'after'
}
export function useReorderKanban(queryKey: QueryKey) {
  const client = useHttp()
  return useMutation((params: SortProps) => client('kanbans/reorder', {
    data: params,
    method: 'POST',
  }),
  useReorderKanbanConfig(queryKey),
  )
}
