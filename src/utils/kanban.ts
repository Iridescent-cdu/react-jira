import { useQuery } from 'react-query'
import { useHttp } from '@/utils/http'
import type { Kanban } from '@/types/kanban'

export function useKanbans(param?: Partial<Kanban>) {
  const client = useHttp()
  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', {
    data: param,
  }))
}
