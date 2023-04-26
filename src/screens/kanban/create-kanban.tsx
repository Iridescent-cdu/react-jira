import React, { useState } from 'react'
import { Input } from 'antd'
import { useKanbansQueryKey, useProjectIdInUrl } from '@/screens/kanban/utils'
import { useAddKanban } from '@/utils/kanban'
import { Container } from '@/screens/kanban/kanban-column'

export function CreateKanban() {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey())
  const submit = async () => {
    await addKanban({ name, projectId })
    setName('')
  }
  return <Container>
    <Input
      size={'large'}
      placeholder={'新建看板名称'}
      onPressEnter={submit}
      value={name}
      onChange={event => setName(event.target.value)}></Input>
  </Container>
}
