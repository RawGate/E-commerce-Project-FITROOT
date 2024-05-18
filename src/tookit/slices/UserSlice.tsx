import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { LoginFormData, User, UserState } from "@/types"
import api from "@/api"

const initialState: UserState = {
  error: null,
  isLoading: false
}

export const registerUser = createAsyncThunk("users/registerUser", async (newUser: User) => {
  //console.log(newUser);
  const response = await api.post("/users", newUser)
  console.log(response.data)
  return response.data
})

export const loginUser = createAsyncThunk("users/loginUser", async (userData: LoginFormData) => {
  //console.log(newUser);
  const response = await api.post("/users/login", userData)
  console.log(response.data)
  return response.data
})

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}
})

export default userSlice.reducer
