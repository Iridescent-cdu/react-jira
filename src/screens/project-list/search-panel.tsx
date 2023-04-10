/** @jsxImportSource @emotion/react */
import React from 'react'
import { Form, Input, Select } from 'antd'

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
      {/* 使用Emotion提供的css功能 */}
      <Form css={{ marginBottom: '2rem' }} layout={'inline'}>
        <Form.Item>
          <Input
            type="text"
            placeholder='项目名'
            value={param.name}
            onChange={(event) => {
              setParam({
                ...param,
                name: event.target.value,
              })
            }}
          />
        </Form.Item>
        <Form.Item>
          <Select
            value={param.personId}
            onChange={value =>
              setParam({
                ...param,
                personId: value,
              })
            }>
            <Select.Option value={''}>负责人</Select.Option>
            {users.map(user => (
              <Select.Option
                key={user.id}
                value={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SearchPanel
