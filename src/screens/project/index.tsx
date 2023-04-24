import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import KanbanScreen from '../kanban'
import EpicScreen from '../epic'

interface Props {}

function ProjectScreen(props: Props) {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanbanScreen/>}></Route>
        <Route path={'/epic'} element={<EpicScreen/>}></Route>
        <Route path={'*'} element={ <Navigate to={`${window.location.pathname}/kanban`} replace={true}/>} ></Route>
      </Routes>
    </div>
  )
}
export default ProjectScreen
