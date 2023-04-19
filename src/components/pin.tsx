import { Rate } from 'antd'
import React from 'react'

interface Props extends React.ComponentProps<typeof Rate> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

function Pin({ checked, onCheckedChange, ...restProps }: Props) {
  return (
    <Rate
     count={1}
     value={checked ? 1 : 0}
     onChange={num => onCheckedChange?.(!!num)}
     {...restProps}/>
  )
}

export default Pin
