import { Button, Drawer } from 'antd'
import React from 'react'
import { useProjectModal } from '@/utils/url'

interface Props {}

function ProjectModal(props: Props) {
  const { projectModalOpen, close } = useProjectModal()
  return (
    <Drawer onClose={close} visible={projectModalOpen} width={'100%'}>
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>  </Drawer>
  )
}

export default ProjectModal
