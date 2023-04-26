import { type QueryKey, useQueryClient } from 'react-query'
import type { Task } from '@/types/task'
import { reorder } from '@/utils/reorder'

export function useConfig(queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) {
  const queryClient = useQueryClient()
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      // 当一触发useMutation就执行
      // target为将要更新的Project信息
      const previousItems = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old)
      })
      return previousItems
    },
    // eslint-disable-next-line n/handle-callback-err
    onError(error: any, newItem: any, context: any) {
      // 当异步操作失败之后，回滚到之前的数据
      queryClient.setQueryData(queryKey, context.previousItems)
    },
  }
}
export function useDeleteConfig(queryKey: QueryKey) {
  return useConfig(queryKey, (target, old) => old?.filter(item => item.id !== target.id) || [])
}
export function useEditConfig(queryKey: QueryKey) {
  return useConfig(queryKey, (target, old) => old?.map(item => item.id === target.id ? { ...item, ...target } : item) || [])
}
export function useAddConfig(queryKey: QueryKey) {
  return useConfig(queryKey, (target, old) => old ? [...old, target] : [])
}

export function useReorderKanbanConfig(queryKey: QueryKey) {
  return useConfig(queryKey, (target, old) => reorder({ list: old, ...target }))
}

export function useReorderTaskConfig(queryKey: QueryKey) {
  return useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[]
    return orderedList.map(item =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item,
    )
  })
}
