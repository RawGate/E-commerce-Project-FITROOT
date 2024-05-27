import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import productReducer from "./slices/ProductSlice"
import userReducer from "./slices/UserSlice"
import categoryReducer from "./slices/CategorySlice"
import cartReducer from "./slices/CartSlice"
import orderReducer from "./slices/OrdersSlice"

const persistConfig = {
  key: "root",
  storage
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    productR: productReducer,
    userR: persistedUserReducer,
    categoryR: categoryReducer,
    cartR: cartReducer,
    orderR: orderReducer
  }
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
