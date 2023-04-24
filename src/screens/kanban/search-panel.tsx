import { Button, Input } from 'antd'
import { useTasksSearchParams } from '@/screens/kanban/utils'
import { useSetUrlSearchParam } from '@/utils/url'
import { Row } from '@/components/lib'
import UserSelect from '@/components/user-select'
import TaskTypeSelect from '@/components/task-type-select'

export function SearchPanel() {
  const searchParams = useTasksSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    })
  }
  return <Row marginBottom={10} gap={true}>
    <Input style={{ width: '20rem' }} placeholder={'任务名'} value={searchParams.name} onChange={event => setSearchParams({ name: event.target.value })}/>
    <UserSelect defaultOptionName={'经办人'} value={searchParams.processorId} onChange={value => setSearchParams({ processorId: value })}/>
    <TaskTypeSelect defaultOptionName={'类型'} value={searchParams.typeId} onChange={value => setSearchParams({ typeId: value })}/>
    <Button onClick={reset}>清除筛选器</Button>
  </Row>
}
