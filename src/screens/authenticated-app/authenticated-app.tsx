import styled from '@emotion/styled'
import { Dropdown, Menu } from 'antd'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ProjectScreen from '../project'
import ProjectModal from '../project-list/project-modal'
import { projectListActions } from '../../store/project-list.slice'
import ProjectListScreen from '@/screens/project-list/index'
import { useAuth } from '@/context/auth-context'
import { ButtonNoPadding, Row } from '@/components/lib'
import { ReactComponent as SoftwareLogo } from '@/assets/software-logo.svg'
import { resetRoute } from '@/utils'
import ProjectPopover from '@/components/project-popover'

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

const Main = styled.main``
function PageHeader(props: {}) {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* <img src={softwareLogo}/> */}
        {/* 使用ReactComponent来渲染svg图标 */}
        <ButtonNoPadding
          type={'link'}
          onClick={resetRoute}>
          <SoftwareLogo
            width={'18rem'}
            color={'rgb(38,132,255)'}></SoftwareLogo>
        </ButtonNoPadding>
        <ProjectPopover {...props} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

function User() {
  const { logout, user } = useAuth()
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <a onClick={logout}>登出</a>
          </Menu.Item>
        </Menu>
      }>
      <a onClick={e => e.preventDefault()}>Hi,{user?.name}</a>
    </Dropdown>
  )
}

function AuthenticatedApp() {
  const dispatch = useDispatch()
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  return (
    <Container>
      <PageHeader/>
      <Main>
        <BrowserRouter>
          <Routes>
            <Route
              path={'/projects'}
              element={
                <ProjectListScreen/>
              }></Route>
            <Route
              path={'/projects/:projectId/*'}
              element={<ProjectScreen />}></Route>
          </Routes>
        </BrowserRouter>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => dispatch(projectListActions.openProjectModal())}
      />
    </Container>
  )
}

export default AuthenticatedApp
