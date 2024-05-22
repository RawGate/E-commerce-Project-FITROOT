import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { ProductState } from "@/types"
import api from "@/api"


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    pageNumber,
    pageSize,
    filteringTerm,
    sortColumn
  }: {
    pageNumber: number
    pageSize: number
    filteringTerm: string
    sortColumn: string
  }) => {
    if (filteringTerm.length > 0) {
      const response = await api.get(
        `/products?filteringTerm=${filteringTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      return response.data
    } else {
      const response = await api.get(
        `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortColumn=${sortColumn}`
      )
      return response.data
    }
  }
)

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (slug: string) => {
    const response = await api.get(`/products/get/${slug}`)
    return response.data
  }
)

const initialState: ProductState = {
  products: [],
  product: null,
  error: null,
  isLoading: false
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log(action.payload)
        state.products = action.payload
        state.isLoading = false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch products."
        state.isLoading = false
      })
    builder
      .addCase(fetchProductBySlug.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.product = action.payload.data
        state.isLoading = false
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch products."
        state.isLoading = false
      })
  }
})

export default productSlice.reducer
