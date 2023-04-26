import { useLocation } from 'react-router-dom'
import { useCallback, useMemo } from 'react'
import { useProject } from '@/utils/project'
import { useUrlQueryParam } from '@/utils/url'
import { useTask } from '@/utils/task'

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
export function useTasksModal() {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId))
  const startEdit = useCallback((id: number) => {
    setEditingTaskId({ editingTaskId: id })
  }, [setEditingTaskId])
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: '' })
  }, [setEditingTaskId])
  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  }
}
