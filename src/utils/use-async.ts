import { useState } from 'react'

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

export function useAsync<D>(initialState?: State<D>) {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  })
  const setData = (data: D) => setState({
    data,
    stat: 'success',
    error: null,
  })
  const setError = (error: Error) => setState({
    error,
    stat: 'error',
    data: null,
  })
  const [retry, setRetry] = useState(() => () => {})

  const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then)
      throw new Error('请传入Promise类型数据')
    setRetry(() => () => {
      if (runConfig?.retry)
        run(runConfig?.retry(), runConfig)
    })
    setState({ ...state, stat: 'loading' })
    return promise.then((data) => {
      setData(data)
      return data
    }).catch((error) => {
      // catch会捕获异常，如果不主动抛出，外面是接收不到异常的
      setError(error)
      return Promise.reject(error)
    })
  }

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
