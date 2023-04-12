import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import List from './list'
import SearchPanel from './search-panel'
import { useDebounce } from '@/utils/index'
import { useProjects } from '@/utils/project'
import { useUsers } from '@/utils/user'

const Container = styled.div`
  padding: 3.2rem;
`
function ProjectListScreen() {
  // const [users, setUsers] = useState([])
  // const [list, setList] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const debouncedParam = useDebounce(param, 2000)
  // const client = useHttp()
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<null | Error>(null)
  const { isLoading, error, data: list } = useProjects(debouncedParam)
  const { data: users } = useUsers()

  // useEffect(() => {
  // setIsLoading(true)
  // client('projects', { data: cleanObject(debouncedParam) })
  //   .then(setList)
  //   .catch(error => setError(error))
  //   .finally(() => setIsLoading(false))
  // run(client('projects', { data: cleanObject(debouncedParam) }))
  // }, [debouncedParam])

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

export default ProjectListScreen
