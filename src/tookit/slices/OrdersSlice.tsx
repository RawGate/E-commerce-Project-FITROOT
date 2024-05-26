import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/api"
import { Order, OrderState } from "@/types"
import { getToken } from "@/utils/localStorage"


export const addOrders = createAsyncThunk(
  "orders/addOrders",
  async (userId: string) => {
    const response = await api.get(`/orders/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)


export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async () => {
    const response = await api.get("/orders/userOrders", {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  }
);


// Fetch all orders (admin use case)
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await api.get("/orders", {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  return response.data
})

// Delete an order
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId: string) => {
    const response = await api.delete(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return { orderId }
  }
)

// Update order status mainly to shipped will fixed it later 
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }: { orderId: string, status: string }) => {
    const response = await api.put(`/orders/${orderId}`, {
      orderStatusUpdate: status
    }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)

const initialState: OrderState = {
  orders: [],
  order: null,
  error: null,
  isLoading: false
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data
        state.isLoading = false
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch orders."
        state.isLoading = false
      })
      .addCase(addOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data
        state.isLoading = false
      })
      .addCase(addOrders.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch user orders."
        state.isLoading = false
      })

      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data
        state.isLoading = false
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch user orders."
        state.isLoading = false
      })

      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order.orderId !== action.payload.orderId)
        state.isLoading = false
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to delete order."
        state.isLoading = false
      })
       .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        console.log(action.payload)
      const foundOrder = state.orders.find(
        (order) => order.orderId === action.payload.categoryId
      )
      if (foundOrder) {
        foundOrder.orderStatus = action.payload.orderStatus
      }
    })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to update order status."
        state.isLoading = false
      })
  }
})


export default orderSlice.reducer
