import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../app/feature/auth/state/auth.slice.js"
import chatSlice from "./feature/user/chat/state/chat.slice.js";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        chat:chatSlice,
    }
})