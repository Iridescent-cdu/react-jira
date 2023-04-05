import ProjectListScreen from '@/screens/project-list/index'
import { useAuth } from '@/context/auth-context'

function AuthenticatedApp() {
  const { logout } = useAuth()
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  )
}
export default AuthenticatedApp
