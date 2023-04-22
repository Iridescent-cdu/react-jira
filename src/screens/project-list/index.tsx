import React from 'react'
import styled from '@emotion/styled'
import { Row, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import List from './list'
import SearchPanel from './search-panel'
import { useProjectsSearchParams } from './util'
import { projectListActions } from '../../store/project-list.slice'
import { useDebounce, useDocumentTitle } from '@/utils/index'
import { useProjects } from '@/utils/project'
import { useUsers } from '@/utils/user'
import { ButtonNoPadding } from '@/components/lib'

const Container = styled.div`
  padding: 3.2rem;
`

// 基本类型，可以放到依赖里，组件状态，可以放到依赖里，非组件状态的对象，绝不可以放到依赖里
function ProjectListScreen(props: {}) {
  const [param, setParam] = useProjectsSearchParams()
  const dispatch = useDispatch()
  const { isLoading, error, retry, data: list } = useProjects(useDebounce(param, 2000))
  const { data: users } = useUsers()
  useDocumentTitle('项目列表')
  return (
    <Container>
      <Row justify={'space-between'}>
        <h1>项目列表</h1>
          <ButtonNoPadding
            type={'link'}
            onClick={() => dispatch(projectListActions.openProjectModal())}>
            创建项目
          </ButtonNoPadding>
      </Row>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      />
      {/* 提示请求错误状态 */}
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : ''}
      {/* 传入loading状态和dataSource数据源 */}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}></List>
    </Container>
  )
}
ProjectListScreen.whyDidYouRender = true

export default ProjectListScreen
