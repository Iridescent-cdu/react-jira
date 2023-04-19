import React from 'react'
import { Select } from 'antd'
import type { Raw } from '@/types'

type SelectProps = React.ComponentProps<typeof Select>

interface Props extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: Raw | null | undefined
  onChange: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string; id: number }[]
}
function toNumber(value: unknown) {
  return isNaN(Number(value)) ? 0 : Number(value)
}
/**
 * value可以传入多种类型的值
 * onChange只会回调number|undefined类型
 * 当isNaN(Number(value))为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 */
function IdSelect(props: Props) {
  const { value, onChange, defaultOptionName, options, ...restProps } = props
  return (
    // Select 组件显示的默认值value通过id与Select.Option组件联动
    <Select
     value={options?.length ? toNumber(value) : 0}
     onChange={value => onChange(toNumber(value) || undefined)}
     {...restProps}
     >
    {
      defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
    }
    {
      options?.map((option) => {
        return (<Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
      })
    }
    </Select >
  )
}

export default IdSelect
