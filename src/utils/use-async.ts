import { useCallback, useReducer, useState } from 'react'
import { useMountedRef } from '.'

interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}
const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
}

function useSafeDispatch<T>(dispatch: (...args: T[]) => void) {
  const mountedRef = useMountedRef()
  // eslint-disable-next-line no-void
  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef])
}

export function useAsync<D>(initialState?: State<D>) {
  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({
    ...state,
    ...action,
  }), {
    ...defaultInitialState,
    ...initialState,
  })
  const safeDispatch = useSafeDispatch(dispatch)
  const [retry, setRetry] = useState(() => () => {})
  const setData = useCallback((data: D) => safeDispatch({
    data,
    stat: 'success',
    error: null,
  }), [])
  const setError = useCallback((error: Error) => safeDispatch({
    error,
    stat: 'error',
    data: null,
  }), [])

  const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then)
      throw new Error('请传入Promise类型数据')
    setRetry(() => () => {
      if (runConfig?.retry)
        run(runConfig?.retry(), runConfig)
    })
    safeDispatch({
      stat: 'loading',
    })
    return promise.then((data) => {
      setData(data)
      return data
    }).catch((error) => {
      // catch会捕获异常，如果不主动抛出，外面是接收不到异常的
      setError(error)
      return Promise.reject(error)
    })
  }, [setData, setError, safeDispatch])

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    // retry被调用时重新调用run，让state刷新一遍
    retry,
    ...state,
  }
}
