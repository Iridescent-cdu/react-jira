import React, { useEffect, useState } from 'react'
import * as qs from 'qs'
import List from './list.js'
import SearchPannel from './search-pannel.js'
import { cleanObject, useDebounce, useMount } from '@/utils/index.js'

const apiUrl = process.env.REACT_APP_API_URL

const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const debouncedParam = useDebounce(param, 2000)
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  })
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async (res) => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [debouncedParam])

  return (
    <div>
      <List
        list={list}
        users={users}></List>
      <SearchPannel
        users={users}
        param={param}
        setParam={setParam}></SearchPannel>
    </div>
  )
}

export default ProjectListScreen
