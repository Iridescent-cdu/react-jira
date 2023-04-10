import styled from '@emotion/styled'
import ProjectListScreen from '@/screens/project-list/index'
import { useAuth } from '@/context/auth-context'

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    'header header header'
    'nav main aside'
    'footer footer footer';
  height: 100vh;
`
// grid-area 用来给grid子元素起名字
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`
const HeaderRight = styled.div``
const Main = styled.main`
  grid-area: main;
`
const Nav = styled.nav`
  grid-area: nav;
`
const Aside = styled.aside`
  grid-area: aside;
`
const Footer = styled.footer`
  grid-area: footer;
`
function AuthenticatedApp() {
  const { logout } = useAuth()
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>aside</Aside>
      <Footer>aside</Footer>
    </Container>
  )
}

export default AuthenticatedApp