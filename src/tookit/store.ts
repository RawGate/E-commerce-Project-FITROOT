import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/ProductSlice"
import userReducer from "./slices/UserSlice"


export const store = configureStore({
    reducer: {
        productR: productReducer,
        userR: userReducer 
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;