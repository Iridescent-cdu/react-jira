import type { QueryKey } from 'react-query'
import { useMutation, useQuery } from 'react-query'
import { useHttp } from '@/utils/http'
import type { Kanban } from '@/types/kanban'
import { useAddConfig, useDeleteConfig } from '@/utils/use-optimistic-options'

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
