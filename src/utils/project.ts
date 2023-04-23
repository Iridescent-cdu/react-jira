import type { QueryKey } from 'react-query'
import { useMutation, useQuery } from 'react-query'
import { useHttp } from './http'
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options'
import type { Project } from '@/screens/project-list/list'

export function useProjects(param?: Partial<Project>) {
  const client = useHttp()
  // 第一个参数可以为一个数组，当数组中元素发生变化时，会重新执行函数获取新数据
  return useQuery<Project[]>(['projects', param], () => client('projects', {
    data: param,
  }))
}

export function useEditProject(queryKey: QueryKey) {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    useEditConfig(queryKey),
  )
}
export function useAddProject(queryKey: QueryKey) {
  const client = useHttp()

  return useMutation((params: Partial<Project>) => client('projects', {
    data: params,
    method: 'POST',
  }),
  useAddConfig(queryKey))
}
export function useDeleteProject(queryKey: QueryKey) {
  const client = useHttp()
  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
    method: 'DELETE',
  }),
  useDeleteConfig(queryKey))
}

export function useProject(id?: number) {
  const client = useHttp()
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`), {
      enabled: Boolean(id),
    })
}
