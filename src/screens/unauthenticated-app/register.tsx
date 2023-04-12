import React from 'react'
import { Form, Input } from 'antd'
import { LongButton } from '.'
import { useAuth } from '@/context/auth-context'
import { useAsync } from '@/utils/use-async'

interface Props {
  onError: (error: Error) => void
}

function Register(props: Props) {
  const { register } = useAuth()
  const { onError } = props
  const { run, isLoading } = useAsync()
  // HTMLFormElement extends Element
  const handleSubmit = async ({ cpassword, ...values }: { username: string; password: string; cpassword: string }) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次输入的密码相同'))
      return
    }

    try {
      await run(register(values))
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
        <Form.Item
          name={'cpassword'}
          rules={[{ required: true, message: '请确认密码' }]}>
          <Input
            type="password"
            id={'cpassword'}
            placeholder={'确认密码'}
          />
        </Form.Item>
        <Form.Item>
          <LongButton
            loading={isLoading}
            htmlType="submit"
            type={'primary'}>
            注册
          </LongButton>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
