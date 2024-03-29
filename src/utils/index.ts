import { useEffect, useRef, useState } from 'react'

export function isFalsy(value: unknown) {
  return value === 0 ? false : !value
}

export function isVoid(value: unknown) {
  return value === undefined || value === null || value === ''
}

export function cleanObject(object: { [key: string]: unknown }) {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    // 0
    if (isVoid(value))
      delete result[key]
  })
  return result
}

export function useMount(callback: () => void) {
  useEffect(() => {
    callback()
    // 依赖项里如果再加上callback会造成无限循环，这个和useCallback和useMemo有关系
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
export function useDocumentTitle(title: string, keepOnUnmount = true) {
  const oldTitle = useRef(document.title).current
  useEffect(() => {
    document.title = title
  }, [title])
  useEffect(() => {
    return () => {
      if (!keepOnUnmount)
      // 如果不指定依赖，利用闭包读到的就是旧title
        document.title = oldTitle
    }
  }, [keepOnUnmount, oldTitle])
}

export function resetRoute() {
  window.location.href = window.location.origin
}

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false，反之，返回true
 */
export function useMountedRef() {
  const mountedRef = useRef(false)
  useEffect(() => {
    // 组件挂载完调用
    mountedRef.current = true
    // 组件卸载时调用
    return () => {
      mountedRef.current = false
    }
  })
  return mountedRef
}
