import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import List from './list'
import SearchPanel from './search-panel'
import { cleanObject, useDebounce, useMount } from '@/utils/index'
import { useHttp } from '@/utils/http'

const apiUrl = process.env.REACT_APP_API_URL
const Container = styled.div`
  padding: 3.2rem;
`
function ProjectListScreen() {
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const debouncedParam = useDebounce(param, 2000)
  const client = useHttp()

  useMount(() => {
    client('users').then(setUsers)
  })
  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam) }).then(setList)
  }, [debouncedParam])

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}></SearchPanel>
      <List
        list={list}
        users={users}></List>
    </Container>
  )
}

export default ProjectListScreen
