import styled from '@emotion/styled'
import { Dropdown, Menu } from 'antd'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProjectScreen from '../project'
import ProjectListScreen from '@/screens/project-list/index'
import { useAuth } from '@/context/auth-context'
import { Row } from '@/components/lib'
import { ReactComponent as SoftwareLogo } from '@/assets/software-logo.svg'

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,.1);
`
const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div``

const Main = styled.main`
`
function PageHeader() {
  const { logout, user } = useAuth()

  return (<Header between={true}>
    <HeaderLeft gap={true}>
      {/* <img src={softwareLogo}/> */}
      {/* 使用ReactComponent来渲染svg图标 */}
      <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'}></SoftwareLogo>
      <h2>项目</h2>
      <h2>用户</h2>
    </HeaderLeft>
    <HeaderRight>
      <Dropdown overlay={<Menu>
        <Menu.Item>
          <a onClick={logout}>登出</a>
        </Menu.Item>
      </Menu>
      }>
        <a onClick={e => e.preventDefault()}>
          Hi,{user?.name}
        </a>
      </Dropdown>
    </HeaderRight>
  </Header>)
}

function AuthenticatedApp() {
  return (
    <Container>
    <PageHeader/>
      <Main>
       <BrowserRouter >
       <Routes>
          <Route path={'/projects'} element={<ProjectListScreen/>}></Route>
          <Route path={'/projects/:projectId/*'} element={<ProjectScreen/>}></Route>
        </Routes>
       </BrowserRouter>
      </Main>

    </Container>
  )
}

export default AuthenticatedApp
