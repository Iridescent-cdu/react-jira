import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useHttp } from './http'
import type { Project } from '@/screens/project-list/list'

export function useProjects(param?: Partial<Project>) {
  const client = useHttp()
  // 第一个参数可以为一个数组，当数组中元素发生变化时，会重新执行函数获取新数据
  return useQuery<Project[]>(['projects', param], () => client('projects', {
    data: param,
  }))
}

export function useEditProject() {
  // useHttp()必须先在useQueryClient()之前调用
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
    },
  )
}

export function useAddProject() {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation((params: Partial<Project>) => client('projects', {
    data: params,
    method: 'POST',
  }), {
    onSuccess: () => queryClient.invalidateQueries('projects'),
  })
}

export function useProject(id?: number) {
  const client = useHttp()
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`), {
      enabled: Boolean(id),
    })
}
