import { useCallback, useEffect } from 'react'
import { useAsync } from './use-async'
import { useHttp } from './http'
import { cleanObject } from '.'
import type { Project } from '@/screens/project-list/list'

export function useProjects(param?: Partial<Project>) {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()
  const fetchProjects = useCallback(() => client('projects', { data: cleanObject(param || {}) }), [param, client])
  useEffect(() => {
    // 这里传入的promise是请求完之后的promise，如果需要重发retry请求，需要传一个派发请求的函数
    run(fetchProjects(), {
      retry: fetchProjects,
    })
  }, [param])
  return result
}

export function useEditProject() {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH',
    }))
  }
  return {
    mutate,
    ...asyncResult,
  }
}
export function useAddProject() {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST',
    }))
  }
  return {
    mutate,
    ...asyncResult,
  }
}
