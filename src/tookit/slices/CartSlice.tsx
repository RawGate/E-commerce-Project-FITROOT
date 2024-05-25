import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "@/types"
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage"


const data = getLocalStorage("cart", { cartItems: [] })
export type CartItem = Product & {orderQuantity: number}
export type CartState = {
  cartItems: CartItem[]
}

const initialState: CartState = {
  cartItems: data.cartItems || [] 
}

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action: PayloadAction<Product>) => {
      if (!state.cartItems) {
        state.cartItems = []
      }
      const item = state.cartItems.find(
        (cartItem) => cartItem.productId === action.payload.productId
      )
      if (item) {
        item.orderQuantity += 1
      } else {
        state.cartItems.push({ ...action.payload, orderQuantity: 1 })
      }
      setLocalStorage("cart", state.cartItems)
    },
    IncreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((cartItem) => cartItem.productId === action.payload)
      if (item) {
        item.orderQuantity += 1
      }
      setLocalStorage("cart", state.cartItems)
    },
    DecreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((cartItem) => cartItem.productId === action.payload)
      if (item && item.orderQuantity > 1) {
        item.orderQuantity -= 1
      }
      setLocalStorage("cart", state.cartItems)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.productId !== action.payload)
      setLocalStorage("cart", state.cartItems)
    },
    removeAllFromCart: (state) => {
      state.cartItems = []
      setLocalStorage("cart", state.cartItems)
    }
  }
})

export const { addtoCart, removeFromCart, removeAllFromCart, IncreaseQuantity, DecreaseQuantity } = CartSlice.actions
export default CartSlice.reducer
