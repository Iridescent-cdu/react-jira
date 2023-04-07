import { Table } from 'antd'
import type { User } from './search-panel'

interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
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
          title: '负责人',
          render(value, project) {
            return <span>{users.find((user) => user.id === project.personId)?.name || '未知'}</span>
          },
        },
      ]}
      dataSource={list}
    />
  )
}

export default List
