import React from 'react'
import { User } from './search-pannel'

interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
}

type Props = {
  list: Project[]
  users: User[]
}

const List = (props: Props) => {
  const { list, users } = props
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>负责人</th>
          </tr>
        </thead>
        <tbody>
          {list.map((project) => (
            <tr key={project.name}>
              <td>{project.name}</td>
              <td>{users.find((user) => user.id === project.personId)?.name || '未知'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default List
