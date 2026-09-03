import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../app/feature/auth/state/auth.slice.js"
import chatSlice from "./feature/user/chat/state/chat.slice.js";
import featureSlice from "./feature/user/feature/state/feature.slice.js"
import projectSlice from "./feature/user/project/state/project.slice.js"
import battleSlice from "./feature/user/battle/state/battle.state.js"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        chat:chatSlice,
        feature : featureSlice,
        project : projectSlice,
        battle : battleSlice,
    }
})