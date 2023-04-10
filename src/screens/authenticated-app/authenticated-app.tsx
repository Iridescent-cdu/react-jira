import styled from '@emotion/styled'
import ProjectListScreen from '@/screens/project-list/index'
import { useAuth } from '@/context/auth-context'
import { Row } from '@/components/lib'

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`
// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
 
  justify-content: space-between;
`
const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div``

const Main = styled.main`

`

function AuthenticatedApp() {
  const { logout } = useAuth()
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>

      <Main>
        <ProjectListScreen />
      </Main>

    </Container>
  )
}

export default AuthenticatedApp
