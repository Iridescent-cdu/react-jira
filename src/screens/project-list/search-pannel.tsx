import React from 'react'

export interface User {
  id: string
  name: string
  email: string
  title: string
  organization: string
}

type Props = {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: Props['param']) => void
}

const SearchPannel = (props: Props) => {
  const { param, setParam, users } = props
  return (
    <div>
      <form>
        <input
          type="text"
          value={param.name}
          onChange={(event) => {
            setParam({
              ...param,
              name: event.target.value,
            })
          }}
        />
        <select
          value={param.personId}
          onChange={(event) =>
            setParam({
              ...param,
              personId: event.target.value,
            })
          }>
          <option value={''}>负责人</option>
          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  )
}

export default SearchPannel
