import { createSlice } from "@reduxjs/toolkit";

const battleSlice = createSlice({
    name: 'battle',
    initialState: {
        battleMessageLoading: false,
        battleMessageError: true,

        battleMessages: [],
        battleMessagesLoading: false,
        battleMessagesError: null
    },
    reducers: {
        setBattleMessageLoading: (state, action) => { state.battleMessageLoading = action.payload },
        setBattleMessageError: (state, action) => { state.battleMessageError = action.payload },
        setBattleMessages: (state, action) => { state.battleMessages = action.payload },
        setBattleMessagesLoading: (state, action) => { state.battleMessagesLoading = action.payload },
        setBattleMessagesError: (state, action) => { state.battleMessagesError = action.payload },
    }
});

export const {
    setBattleMessageError , setBattleMessageLoading,
    setBattleMessages, setBattleMessagesLoading, setBattleMessagesError
} = battleSlice.actions

export default battleSlice.reducer