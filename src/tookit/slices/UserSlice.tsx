import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { LoginFormData, UpdateProfileFormData, User, UserState } from "@/types"
import api from "@/api"
import { getToken } from "@/utils/localStorage"

const initialState: UserState = {
  users: [],
  totalPages: 3,
  error: null,
  isLoading: false,
  userData: null,
  token: null,
  isLoggedIn: false
}

export const registerUser = createAsyncThunk("users/registerUser", async (newUser: User) => {
  const response = await api.post("/users", newUser)
  return response.data
})

export const loginUser = createAsyncThunk("users/loginUser", async (userData: LoginFormData) => {
  const response = await api.post("/users/login", userData)
  return response.data
})

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ updateUserData, userId }: { updateUserData: UpdateProfileFormData; userId: string }) => {
    const response = await api.put(`/users/${userId}`, updateUserData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    if (response.data) {
      return response.data
    } else {
      throw new Error("No data found")
    }
  }
)

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({
    pageNumber,
    pageSize,
    searchTerm,
    sortBy
  }: {
    pageNumber: number
    pageSize: number
    searchTerm: string
    sortBy: string
  }) => {
    const response = await api.get(
      `/users?pageNumber=${pageNumber}&pageSize=${pageSize}${
        searchTerm ? `&searchTerm=${searchTerm}` : `&sortBy=${sortBy}`
      }`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    )
    return response.data
  }
)

export const blockUser = createAsyncThunk(
  "users/blockUser",
  async ( userId: string ) => {
    const response = await api.put(`/users/${userId}/block`, {}, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      return userId
  }
)

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.token = null
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
      )
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload.data.user
      state.token = action.payload.data.token
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
      )
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const user = action.payload.data
      if (state.userData) {
        state.userData.name = user.name
        state.userData.address = user.address
      }
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
      )
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log(action.payload.data)
      state.users = action.payload.data
      state.isLoading = false
    })

    builder.addCase(blockUser.fulfilled, (state, action) => {
      console.log(action.payload)
      const foundUser = state.users.find(
        (users) => users.userId === action.payload
      )
      if (foundUser) {
        foundUser.isBlocked = !foundUser.isBlocked
      }
      state.isLoading = false
    })

    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.error = null
        state.isLoading = true
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state) => {
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
