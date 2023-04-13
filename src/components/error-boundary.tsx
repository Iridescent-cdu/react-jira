import type { PropsWithChildren } from 'react'
import { PureComponent } from 'react'
import type React from 'react'

type FallbackRender = (props: { error: Error | null }) => React.ReactElement
export class ErrorBoundary extends PureComponent< PropsWithChildren<{ fallbackRender: FallbackRender }>, any> {
  state = { error: null }
  // 当子组件抛出异常，这里会接收到并且调用，在事件处理中手打抛出的异常不会被处理
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error)
      return fallbackRender(error)
    return children
  }
}
