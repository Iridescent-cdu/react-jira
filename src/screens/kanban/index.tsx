import React from 'react'
import styled from '@emotion/styled'
import { useDocumentTitle } from '@/utils'
import { useKanbans } from '@/utils/kanban'
import { useKanbanSearchParams, useProjectInUrl } from '@/screens/kanban/utils'
import { KanbanColumn } from '@/screens/kanban/kanban-column'
import { SearchPanel } from '@/screens/kanban/search-panel'

const ColumnsContainer = styled.div`
  display: flex;
  overflow:hidden;
  margin-right:2rem;
`
interface Props {}

function KanbanScreen(props: Props) {
  useDocumentTitle(('看板列表'))
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  return (
    <div>
      <h1>
        {currentProject?.name}看板
      </h1>
      <SearchPanel></SearchPanel>
      <ColumnsContainer>
        {
          kanbans?.map(kanban => <KanbanColumn key={kanban.id} kanban={kanban} />)
        }
      </ColumnsContainer>
    </div>
  )
}
export default KanbanScreen
