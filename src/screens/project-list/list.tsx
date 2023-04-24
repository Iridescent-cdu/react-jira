import type { TableProps } from 'antd'
import { Dropdown, Menu, Modal, Table } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useProjectModal, useProjectsQueryKey } from './util'
import Pin from '@/components/pin'
import { useDeleteProject, useEditProject } from '@/utils/project'
import { ButtonNoPadding } from '@/components/lib'
import type { Project } from '@/types/project'
import type { User } from '@/types/user'

// 继承antd TableProps的类型，传入泛型Project
interface Props extends TableProps<Project> {
  users: User[]
}

function List({ users, ...props }: Props) {
  const { mutate } = useEditProject(useProjectsQueryKey())

  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })

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
            return <More project={project}/>
          },
        },
      ]}
      {...props}
    />
  )
}

function More({ project }: { project: Project }) {
  const { startEdit } = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确定删除这个项目吗？',
      content: '点击确定删除',
      okText: '确定',
      onOk() {
        deleteProject({ id })
      },
    })
  }
  return (<Dropdown overlay={
  <Menu>
    <Menu>
        <Menu.Item onClick={editProject(project.id)} key={'edit'}>
          编辑
        </Menu.Item>
        <Menu.Item key={'delete'} onClick={() => confirmDeleteProject(project.id)}>删除</Menu.Item>
      </Menu>
  </Menu>
}>
  <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
</Dropdown>)
}
export default List
