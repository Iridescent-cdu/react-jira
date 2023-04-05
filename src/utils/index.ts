import { useEffect, useState } from 'react'

export function isFalsy(value: unknown) {
  return value === 0 ? false : !value
}

export function cleanObject(object: object) {
  const result = { ...object }

  Object.keys(result).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const value = result[key]
    // 0
    if (isFalsy(value)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      delete result[key]
    }
  })
  return result
}

export function useMount(callback: () => void) {
  useEffect(() => {
    callback()
  }, [])
}

export function useDebounce<V>(value: V, delay?: number): V {
  // 1.创建一个debouncedValue
  const [debouncedValue, setDebounceValue] = useState(value)
  // 2. 监听原始value的变化，延迟设置debouncedValue的值
  useEffect(() => {
    // 3. 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    // 4. 每次在上一个useEffect处理完后清理副作用
    return () => clearTimeout(timeout)
  }, [value, delay])
  // 5. 最后返回延迟更新的debouncedValue值
  return debouncedValue
}

export function useArray<T>(initialArray: T[]) {
  const [value, setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)
      setValue(copy)
    },
  }
}
