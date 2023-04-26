import React from 'react'
import styled from '@emotion/styled'
import { Spin } from 'antd'
import { useDocumentTitle } from '@/utils'
import { useKanbans } from '@/utils/kanban'
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from '@/screens/kanban/utils'
import { KanbanColumn } from '@/screens/kanban/kanban-column'
import { SearchPanel } from '@/screens/kanban/search-panel'
import { ScreenContainer } from '@/components/lib'
import { useTasks } from '@/utils/task'
import { CreateKanban } from '@/screens/kanban/create-kanban'
import { TaskModal } from '@/screens/kanban/task-modal'

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x:auto;
  margin-right:2rem;
  flex: 1;
`
interface Props {}

function KanbanScreen(props: Props) {
  useDocumentTitle(('看板列表'))
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
  const isLoading = taskIsLoading || kanbanIsLoading
  return (
    <ScreenContainer>
      <h1>
        {currentProject?.name}看板
      </h1>
      <SearchPanel></SearchPanel>
      {isLoading
        ? <Spin size={'large'}/>
        : <ColumnsContainer>
        {
          kanbans?.map(kanban => <KanbanColumn key={kanban.id} kanban={kanban} />)
        }
        <CreateKanban/>
      </ColumnsContainer>}
     <TaskModal/>
    </ScreenContainer>
  )
}
export default KanbanScreen
