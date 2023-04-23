import type { TableProps } from 'antd'
import { Dropdown, Menu, Table } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import type { User } from './search-panel'
import { useProjectModal } from './util'
import Pin from '@/components/pin'
import { useEditProject } from '@/utils/project'
import { ButtonNoPadding } from '@/components/lib'

export interface Project {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: number
}

// 继承antd TableProps的类型，传入泛型Project
interface Props extends TableProps<Project> {
  users: User[]
}

function List({ users, ...props }: Props) {
  const { mutate } = useEditProject()
  const { startEdit } = useProjectModal()
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
  const editProject = (id: number) => () => startEdit(id)
  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true}/>,
          render(value, project) {
            return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>
          },
        },
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
        {
          render(value, project) {
            return <Dropdown overlay={
              <Menu>
                <Menu>
                    <Menu.Item onClick={editProject(project.id)} key={'edit'}>
                      编辑
                    </Menu.Item>
                    <Menu.Item key={'delete'}>删除</Menu.Item>
                  </Menu>
              </Menu>
            }>
              <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
            </Dropdown>
          },
        },
      ]}
      {...props}
    />
  )
}

export default List
