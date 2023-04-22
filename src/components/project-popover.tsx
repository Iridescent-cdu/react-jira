import { Divider, List, Popover, Typography } from 'antd'
import React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { ButtonNoPadding } from './lib'
import { useProjects } from '@/utils/project'
import { projectListActions } from '@/store/project-list.slice'

const ContentContainer = styled.div`
  min-width: 30rem;
`
interface Props {

}
function ProjectPopover(props: Props) {
  const dispatch = useDispatch()
  const { data: projects, isLoading } = useProjects()
  const pinnedProjects = projects?.filter(project => project.pin)
  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map(project => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
          <ButtonNoPadding
            type={'link'}
            onClick={() => dispatch(projectListActions.openProjectModal())}>
            创建项目
          </ButtonNoPadding>
    </ContentContainer>
  )
  return (
    <Popover
      placement={'bottom'}
      content={content}>
      <span>项目</span>
    </Popover>
  )
}

export default ProjectPopover
