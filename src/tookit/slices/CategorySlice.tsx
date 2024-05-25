import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { CategoryState, CreateCategoryFormData } from "@/types"
import api from "@/api"
import { getToken } from "@/utils/localStorage"



const initialState: CategoryState = {
  categories: [],
  totalPages: 1,
  category: null,
  error: null,
  isLoading: false
}

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
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
      `/categories?pageNumber=${pageNumber}&pageSize=${pageSize}${
        searchTerm ? `&searchTerm=${searchTerm}` : `&sortBy=${sortBy}`
      }`
    )
    return response.data
  }
)

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: string) => {
    await api.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return categoryId
  }
)

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (newCategory: CreateCategoryFormData) => {
    const response = await api.post("/categories", newCategory, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    return response.data
  }
)

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({
    updateCategoryData,
    categoryId
  }: {
    updateCategoryData: CreateCategoryFormData
    categoryId: string
  }) => {
    const response = await api.put(`/categories/${categoryId}`, updateCategoryData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)

const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        state.totalPages = action.payload.totalPages 
        state.isLoading = false
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch categories."
        state.isLoading = false
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.categoryId !== action.payload
        )
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload)
      })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      console.log(action.payload)
      const foundCategory = state.categories.find(
        (category) => category.categoryId === action.payload.categoryId
      )
      if (foundCategory) {
        foundCategory.name = action.payload.name 
        foundCategory.description = action.payload.description
      }
    })
  }
})

export default CategorySlice.reducer
