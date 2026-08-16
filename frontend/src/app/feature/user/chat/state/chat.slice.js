import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [],
        chatsLoading: false,
        chatsError: null,

        messages: [],
        messagesLoading: false,
        messagesError: null,
    },
    reducers: {
        setChats: (state, action) => { state.chats = action.payload },
        setChatsLoading: (state, action) => { state.chatsLoading = action.payload },
        setChatsError: (state, action) => { state.chatsError = action.payload },
        setMessages: (state, action) => { state.messages = action.payload },
        setMessagesLoading: (state, action) => { state.messagesLoading = action.payload },
        setMessagesError: (state, action) => { state.messagesError = action.payload },
    },
});

export const {
    setChats,
    setChatsError,
    setChatsLoading,
    setMessages,
    setMessagesError,
    setMessagesLoading,  
} = chatSlice.actions

export default chatSlice.reducer

