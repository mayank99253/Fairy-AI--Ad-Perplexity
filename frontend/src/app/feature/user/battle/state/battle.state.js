import { createSlice } from "@reduxjs/toolkit";

const battleSlice = createSlice({
    name: 'battle',
    initialState: {
        battleMessageLoading: false,
        battleMessageError: true,
    },
    reducers: {
        setBattleMessageLoading: (state, action) => { state.battleMessageLoading = action.payload },
        setBattleMessageError: (state, action) => { state.battleMessageError = action.payload }
    }
});

export const {
    setBattleMessageError , setBattleMessageLoading
} = battleSlice.actions

export default battleSlice.reducer