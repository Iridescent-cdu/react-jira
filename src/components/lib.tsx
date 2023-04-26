import styled from '@emotion/styled'
import { Button, Spin, Typography } from 'antd'
import { DevTools } from 'jira-dev-tool'
import React from 'react'

export const Row = styled.div<{
  gap?: number | boolean
  between?: boolean
  marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.between ? 'space-between' : undefined};
  margin-bottom:${props => `${props.marginBottom}rem`};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? `${props.gap}rem` : props.gap ? '2rem' : undefined};
  }
`
const FullPage = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`
export function FullPageLoading() {
  return <FullPage>
    <Spin size={'large'}></Spin>
</FullPage>
}
export function FUllPageErrorFallback({ error }: { error: Error | null }) {
  return <FullPage>
    <DevTools></DevTools>
    <ErrorBox error={error}/>
  </FullPage>
}
export const ButtonNoPadding = styled(Button)`
  padding: 0;
`
// 类型守卫
function isError(value: any): value is Error {
  return value?.message
}
export function ErrorBox({ error }: { error: unknown }) {
  if (isError(error))
    return <Typography.Text type={'danger'} >{error?.message}</Typography.Text>
  return null
}

export const ScreenContainer = styled.div`
  max-width: 100%;
  padding:3.2rem;
  display: flex;
  flex-direction: column;

`
