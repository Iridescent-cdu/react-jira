import { Form, Input, Select } from 'antd'
import React from 'react'

export interface User {
  id: string
  name: string
  email: string
  title: string
  organization: string
  token: string
}

interface Props {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: Props['param']) => void
}

function SearchPanel(props: Props) {
  const { param, setParam, users } = props
  return (
    <div>
      <Form>
        <Input
          type="text"
          value={param.name}
          onChange={(event) => {
            setParam({
              ...param,
              name: event.target.value,
            })
          }}
        />
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }>
          <Select.Option value={''}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option
              key={user.id}
              value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form>
    </div>
  )
}

export default SearchPanel
