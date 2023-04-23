import React from 'react'
import styled from '@emotion/styled'
import { Button, Row } from 'antd'
import List from './list'
import SearchPanel from './search-panel'
import { useProjectModal, useProjectsSearchParams } from './util'
import { useDebounce, useDocumentTitle } from '@/utils/index'
import { useProjects } from '@/utils/project'
import { useUsers } from '@/utils/user'

import { ErrorBox } from '@/components/lib'

const Container = styled.div`
  padding: 3.2rem;
`
// 基本类型，可以放到依赖里，组件状态，可以放到依赖里，非组件状态的对象，绝不可以放到依赖里
function ProjectListScreen(props: {

}) {
  const [param, setParam] = useProjectsSearchParams()
  const { open } = useProjectModal()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 2000))
  const { data: users } = useUsers()
  useDocumentTitle('项目列表')
  return (
    <Container>
      <Row justify={'space-between'}>
        <h1>项目列表</h1>
        <Button onClick={open}>创建项目</Button>
      </Row>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam} />
      {/* 提示请求错误状态 */}
      <ErrorBox error={error}/>

      {/* 传入loading状态和dataSource数据源 */}
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}></List>
    </Container >
  )
}
// ProjectListScreen.whyDidYouRender = true

export default ProjectListScreen
