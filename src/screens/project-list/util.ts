import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useUrlQueryParam } from '@/utils/url'
import { useProject } from '@/utils/project'
// 项目列表搜索的参数
export function useProjectsSearchParams() {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam,
  ] as const
}
export function useProjectModal() {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate',
  ])
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId',
  ])
  const [_, setUrlParams] = useSearchParams()
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId),
  )

  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => setUrlParams({ projectCreate: '', editingProjectId: '' })
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id })

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  }
}
