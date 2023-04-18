import React from 'react'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import List from './list'
import SearchPanel from './search-panel'
import { useDebounce, useDocumentTitle } from '@/utils/index'
import { useProjects } from '@/utils/project'
import { useUsers } from '@/utils/user'
import { useUrlQueryParam } from '@/utils/url'

const Container = styled.div`
  padding: 3.2rem;
`
function ProjectListScreen() {
  // 基本类型，可以放到依赖里，组件状态，可以放到依赖里，非组件状态的对象，绝不可以放到依赖里
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  const debouncedParam = useDebounce(param, 2000)
  const { isLoading, error, data: list } = useProjects(debouncedParam)
  const { data: users } = useUsers()
  useDocumentTitle('项目列表')
  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam} />
      {/* 提示请求错误状态 */}
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : ''}
      {/* 传入loading状态和dataSource数据源 */}
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}></List>
    </Container >
  )
}
ProjectListScreen.whyDidYouRender = true

export default ProjectListScreen
