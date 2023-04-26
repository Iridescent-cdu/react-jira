import type { QueryKey } from 'react-query'
import { useMutation, useQuery } from 'react-query'
import { useHttp } from '@/utils/http'
import type { Epic } from '@/types/epic'
import {
  useAddConfig,
  useDeleteConfig,
} from '@/utils/use-optimistic-options'

export function useEpics(param?: Partial<Epic>) {
  const client = useHttp()
  return useQuery<Epic[]>(['epics', param], () => client('epics', {
    data: param,
  }))
}
export function useAddEpic(queryKey: QueryKey) {
  const client = useHttp()

  return useMutation((params: Partial<Epic>) => client('epics', {
    data: params,
    method: 'POST',
  }),
  useAddConfig(queryKey))
}
export function useDeleteEpic(queryKey: QueryKey) {
  const client = useHttp()
  return useMutation((params: Partial<Epic>) => client(`epics/${params.id}`, {
    method: 'DELETE',
  }),
  useDeleteConfig(queryKey))
}
