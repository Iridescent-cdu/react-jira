import { Table } from 'antd'
import dayjs from 'dayjs'
import type { User } from './search-panel'

interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
  created: number
}

interface Props {
  list: Project[]
  users: User[]
}

function List(props: Props) {
  const { list, users } = props
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
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
      dataSource={list}
    />
  )
}

export default List
