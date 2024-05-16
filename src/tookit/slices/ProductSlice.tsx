import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductState } from '@/types';
import api from '@/api';

// to define the type for the API response data structure
type ApiData = {
  $id: string;
  $values: Array<any>;
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ pageNumber, pageSize, filteringTerm }: { pageNumber: number; pageSize: number, filteringTerm: string }) => {
    if (filteringTerm.length > 0){
const response = await api.get<ApiData>(`/products?filteringTerm=${filteringTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
return response.data;
} else {
const response = await api.get<ApiData>(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}`);
return response.data;
}}
);

export const fetchProductBySlug = createAsyncThunk(
  'products/fetchProductBySlug',
  async (slug: string) => {
    const response = await api.get(`/products/get/${slug}`);
    return response.data; 
  }
);

const initialState: ProductState = {
  products: [],
  product: null,
  error: null,
  isLoading: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { $values } = action.payload;
        if ($values && Array.isArray($values)) {
          state.products = $values;
        } else {
          state.error = 'Invalid data format';
        }
        
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to fetch products.';
        state.isLoading = false;
      });
    builder
      .addCase(fetchProductBySlug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.product = action.payload.data;
        state.isLoading = false;
      
})
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to fetch products.';
        state.isLoading = false;
      });
  },
});

export default productSlice.reducer;