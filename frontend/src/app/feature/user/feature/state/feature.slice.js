import { createSlice } from '@reduxjs/toolkit'

const featureSlice = createSlice({
    name: 'feature',
    initialState: {
        genImages: [],
        genImagesLoading: false,
        genImagesError: null,

        allChats: [],
        allChatsLoading: false,
        allChatsError: null,
    },
    reducers: {
        setGenImages: (state, action) => { state.genImages = action.payload },
        setGenImagesLoading: (state, action) => { state.genImagesLoading = action.payload },
        setGenImagesError: (state, action) => { state.genImagesError = action.payload },

        setAllChats: (state, action) => { state.allChats = action.payload },
        setAllChatsLoading: (state, action) => { state.allChatsLoading = action.payload },
        setAllChatsError: (state, action) => { state.allChatsError = action.payload },
    },
});

export const {
    setGenImages, setGenImagesError, setGenImagesLoading,
    setAllChats, setAllChatsLoading, setAllChatsError
} = featureSlice.actions

export default featureSlice.reducer

