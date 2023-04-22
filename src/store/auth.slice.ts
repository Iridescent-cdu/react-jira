import { createSlice } from '@reduxjs/toolkit'
import * as auth from '../auth-provider'
import type { AppDispatch, RootState } from '.'
import type { User } from '@/screens/project-list/search-panel'
import type { AuthForm } from '@/context/auth-context'
import { bootstrapUser } from '@/context/auth-context'

interface State {
  user: User | null
}

const initialState: State = {
  user: null,
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
  },
})

const { setUser } = authSlice.actions

export function selectUser(state: RootState) {
  return state.auth.user
}

export function login(form: AuthForm) {
  return (dispatch: AppDispatch) => auth.login(form).then(user => dispatch(setUser(user)))
}
export function register(form: AuthForm) {
  return (dispatch: AppDispatch) => auth.register(form).then(user => dispatch(setUser(user)))
}
export function logout() {
  return (dispatch: AppDispatch) => auth.logout().then(user => dispatch(setUser(null)))
}
export function bootstrap() {
  return (dispatch: AppDispatch) => bootstrapUser().then(user => dispatch(setUser(user)))
}
