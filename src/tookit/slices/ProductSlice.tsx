import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { CreateProductForBackend, Product, ProductState } from "@/types"
import api from "@/api"
import { getToken } from "@/utils/localStorage"


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    pageNumber,
    pageSize,
    searchTerm,
    sortBy,
    selectedCategories,
    minPrice,
    maxPrice
  }: {
    pageNumber: number
    pageSize: number
    searchTerm: string
    sortBy: string
    selectedCategories: string[]
    minPrice?: number
    maxPrice?: number
  }) => {
    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      searchTerm,
      sortBy

    })
    selectedCategories.forEach((categoryId) =>  {
      params.append("SelectedCategories", categoryId)
    })
    if(minPrice !== undefined){
      params.append("minPrice", minPrice.toString())
    }
    if (maxPrice !== undefined) {
      params.append("maxPrice", maxPrice.toString())
    }
    
    const response = await api.get("/products", {params})
    return response.data
  }
)

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (slug: string) => {
    const response = await api.get(`/products/get/${slug}`)
    return response.data
  }
)

export const deleteProduct = createAsyncThunk("Products/deleteProducts", async (productId: string) => {
  await api.delete(`/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  return productId
})

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct: CreateProductForBackend) => {
    const response = await api.post("/products", newProduct, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    console.log(response.data)
    return response.data
  }
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    updateProductData,
    productId
  }: {
    updateProductData: Product
    productId: string
  }) => {
    const response = await api.put(`/products/${productId}`, updateProductData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
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
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.productId !== action.payload)
        state.isLoading = false
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.data)
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProductIndex = state.products.findIndex(
          (product) => product.productId === action.payload.productId
        )
        if (updatedProductIndex >= 0) {
          state.products[updatedProductIndex] = action.payload
        }
      })    
  }
})

export default productSlice.reducer
