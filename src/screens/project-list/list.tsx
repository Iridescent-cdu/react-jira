import type { TableProps } from 'antd'
import { Table } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import type { User } from './search-panel'

export interface Project {
  id: number
  name: string
  personId: string
  pin: boolean
  organization: string
  created: number
}

// 继承antd TableProps的类型，传入泛型Project
interface Props extends TableProps<Project> {
  users: User[]
}

function List({ users, ...props }: Props) {
  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: '负责人',
          render(value, project) {
            return <span key={project.id}>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
          },
        },
        {
          title: '创建时间',
          render(value, project) {
            return <span key={project.id}>
              {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
            </span>
          },
        },
      ]}
      {...props}
    />
  )
}

export default List
