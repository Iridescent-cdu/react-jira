import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { authSlice } from './auth.slice'
import { projectListSlice } from '@/store/project-list.slice'

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
}
export const store = configureStore({
  reducer: rootReducer,
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export function useAppDispatch() {
  return useDispatch<AppDispatch>()
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
