import React from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import { Menu } from 'antd'
import { KanbanScreen } from '../kanban'
import { EpicScreen } from '../epic'

const Aside = styled.aside`
  background-color: rgb(244,245,247);
  display: flex;
`
const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0,0,0,0.1);
  overflow: hidden;
`
const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  overflow: hidden;
`
function useRouteType() {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}
interface Props {}

function ProjectScreen(props: Props) {
  const routeType = useRouteType()
  return (
    <Container>
     <Aside>
       <Menu mode={'inline'} selectedKeys={[routeType]}>
         <Menu.Item key={'kanban'}>
           <Link to={'kanban'}>看板</Link>
         </Menu.Item>
         <Menu.Item key={'epic'}>
           <Link to={'epic'}>任务组</Link>
         </Menu.Item>
       </Menu>
     </Aside>
      <Main>
        <Routes>
          <Route path={'/kanban'} element={<KanbanScreen/>}></Route>
          <Route path={'/epic'} element={<EpicScreen/>}></Route>
          <Route path={'*'} element={ <Navigate to={`${window.location.pathname}/kanban`} replace={true}/>} ></Route>
        </Routes>
      </Main>
    </Container>
  )
}
export default ProjectScreen
