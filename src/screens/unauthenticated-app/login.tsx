import React from 'react'
import { Form, Input } from 'antd'
import { LongButton } from '.'
import { useAuth } from '@/context/auth-context'
import { useAsync } from '@/utils/use-async'

interface Props {
  onError: (error: Error) => void
}

function Login(props: Props) {
  const { login, user } = useAuth()
  const { onError } = props
  const { run, isLoading } = useAsync()

  // HTMLFormElement extends Element
  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      await run(login(values))
    }
    catch (e) {
      onError(e as Error)
    }
  }
  return (
    <div>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name={'username'}
          rules={[{ required: true, message: '请输入用户名' }]}>
          <Input
            type="text"
            id={'username'}
            placeholder={'用户名'}
          />
        </Form.Item>
        <Form.Item
          name={'password'}
          rules={[{ required: true, message: '请输入密码' }]}>
          <Input
            type="password"
            id={'password'}
            placeholder={'密码'}
          />
        </Form.Item>
        <Form.Item>
          <LongButton
            htmlType="submit"
            type={'primary'}>
            登录
          </LongButton>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
