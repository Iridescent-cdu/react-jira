import { useEffect } from 'react'
import { useAsync } from './use-async'
import { useHttp } from './http'
import { cleanObject } from '.'
import type { Project } from '@/screens/project-list/list'

export function useProjects(param?: Partial<Project>) {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()
  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) }))
  }, [param])
  return result
}
