import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { useProject } from '@/utils/project'
import { useUrlQueryParam } from '@/utils/url'

export function useProjectIdInUrl() {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}
export function useProjectInUrl() {
  return useProject(useProjectIdInUrl())
}
export function useKanbanSearchParams() {
  return { projectId: useProjectIdInUrl() }
}
export function useKanbansQueryKey() {
  return ['kanbans', useKanbanSearchParams()]
}
export function useTasksSearchParams() {
  const [param, setParam] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId',
  ])
  const projectId = useProjectIdInUrl()
  return useMemo(() => ({
    projectId,
    typeId: Number(param.typeId) || undefined,
    processorId: Number(param.processorId) || undefined,
    tagId: Number(param.tagId) || undefined,
    name: param.name,
  }), [projectId, param])
}
export function useTasksQueryKey() {
  return ['tasks', useTasksSearchParams()]
}
