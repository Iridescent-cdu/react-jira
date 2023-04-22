import { Button, Drawer } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { projectListActions, selectProjectModalOpen } from '../../store/project-list.slice'

interface Props {
  projectModalOpen: boolean
  onClose: () => void
}

function ProjectModal(props: Props) {
  const dispatch = useDispatch()
  const projectModalOpen = useSelector(selectProjectModalOpen)
  return (
    <Drawer
      onClose={props.onClose}
      visible={projectModalOpen}
      width={'100%'}>
      <h1>Project Modal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>{' '}
    </Drawer>
  )
}

export default ProjectModal
