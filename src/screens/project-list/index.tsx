import React, { useEffect, useState } from 'react'
import * as qs from 'qs'
import List from './list'
import SearchPanel from './search-panel'
import { cleanObject, useDebounce, useMount } from '@/utils/index'

const apiUrl = process.env.REACT_APP_API_URL

function ProjectListScreen() {
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const debouncedParam = useDebounce(param, 2000)
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) setUsers(await res.json())
    })
  })
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async (res) => {
      if (res.ok) setList(await res.json())
    })
  }, [debouncedParam])

  return (
    <div>
      <List
        list={list}
        users={users}></List>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}></SearchPanel>
    </div>
  )
}

export default ProjectListScreen
