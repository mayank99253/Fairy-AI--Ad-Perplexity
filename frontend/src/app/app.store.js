import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../app/feature/auth/state/auth.slice.js"

export const store = configureStore({
    reducer: {
        auth: authSlice,
    }
})