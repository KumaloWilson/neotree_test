import { createSlice, type Dispatch, type PayloadAction } from "@reduxjs/toolkit"
import authService from "../services/auth-service"
import type { User, UserCredentials, UserSession } from "../types/user"

// Redux slice for auth state
interface AuthState {
  user: Omit<User, "password"> | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

// Create the auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<UserSession>) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.access_token
      state.error = null

      // Store token in localStorage for persistence
      localStorage.setItem("auth_token", action.payload.access_token)
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = action.payload
    },
    logoutSuccess: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null

      // Clear stored auth data
      localStorage.removeItem("auth_token")
      localStorage.removeItem("auth_user")
    },
  },
})

// Export actions
export const { loginStart, loginSuccess, loginFailure, logoutSuccess } = authSlice.actions
export default authSlice.reducer

// Thunk action for login
export const loginUser = (credentials: UserCredentials) => async (dispatch: Dispatch) => {
  dispatch(loginStart())
  try {
    const userSession = await authService.login(credentials)
    dispatch(loginSuccess(userSession))
    return userSession
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Login failed"
    dispatch(loginFailure(errorMessage))
    throw error
  }
}

// Thunk action for logout
export const logoutUser = () => (dispatch: Dispatch) => {
  authService.logout()
  dispatch(logoutSuccess())
}
