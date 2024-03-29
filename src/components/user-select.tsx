import React from 'react'
import IdSelect from './id-select'
import { useUsers } from '@/utils/user'

function UserSelect(props: React.ComponentProps<typeof IdSelect>) {
  const { data: users } = useUsers()
  return (
    <IdSelect options={users || []} {...props}></IdSelect>
  )
}

export default UserSelect
