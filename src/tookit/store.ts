import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/ProductSlice"
import userReducer from "./slices/UserSlice"
import categoryReducer from "./slices/CategorySlice"


export const store = configureStore({
  reducer: {
    productR: productReducer,
    userR: userReducer,
    categoryR: categoryReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;