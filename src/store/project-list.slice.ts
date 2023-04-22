import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

interface State {
  projectModalOpen: boolean
}
const initialState: State = {
  projectModalOpen: false,
}
export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    openProjectModal(state) {
      // Redux Toolkit使用Immer帮我们处理了不可变数据
      state.projectModalOpen = true
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    },
  },
})
export const projectListActions = projectListSlice.actions
export function selectProjectModalOpen(state: RootState) {
  return state.projectList.projectModalOpen
}
