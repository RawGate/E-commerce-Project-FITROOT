import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { LoginFormData, UpdateProfileFormData, User, UserState } from "@/types"
import api from "@/api"
import { getToken } from "@/utils/localStorage"


const initialState: UserState = {
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
    const token = getToken();
    const response = await api.put(`/users/${userId}`, updateUserData, {headers: {
      Authorization:`Bearer ${token}`
    }})
    if (response.data) {
      console.log(response.data)
      return response.data
    } else {
      throw new Error("No data found")
    }
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
      const user = action.payload.data; 
      if (state.userData) {
        state.userData.name = user.name;
        state.userData.address = user.address;
      }
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token,
        })
      );
    });
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
