import { useProjectIdInUrl } from '@/screens/kanban/utils'

export function useEpicSearchParams() {
  return { projectId: useProjectIdInUrl() }
}

export function useEpicsQueryKey() {
  return ['epics', useEpicSearchParams()]
}
