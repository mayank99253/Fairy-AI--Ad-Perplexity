import { createSlice } from '@reduxjs/toolkit'

const projectSlice = createSlice({
    name: 'project',

    initialState: {
        allProject: [],
        allProjectLoading: false,
        allProjectError: null,

        allChats: [],
        allChatsLoading: false,
        allChatsError: null,

        createProjectLoading: false,
        createProjectError: null,

        addChatToProjectLoading: false,
        addChatToProjectError: null,

        selectProject: null,
        selectProjectLoading: false,
        selectProjectError: null,
    },

    reducers: {
        setAllProjects: (state, action) => { state.allProject = action.payload },
        setAllProjectsLoading: (state, action) => { state.allProjectLoading = action.payload },
        setAllProjectsError: (state, action) => { state.allProjectError = action.payload },

        setAllChats: (state, action) => { state.allChats = action.payload },
        setAllChatsLoading: (state, action) => { state.allChatsLoading = action.payload },
        setAllChatsError: (state, action) => { state.allChatsError = action.payload },

        setCreateProjectLoading: (state, action) => { state.createProjectLoading = action.payload },
        setCreateProjectError: (state, action) => { state.createProjectError = action.payload },

        setAddChatToProjectLoading: (state, action) => { state.addChatToProjectLoading = action.payload }, setAddChatToProjectError: (state, action) => { state.addChatToProjectError = action.payload },

        setSelectedProject: (state, action) => { state.selectProject = action.payload },
        setSelectedProjectLoading: (state, action) => { state.selectProjectLoading = action.payload },
        setSelectedProjectError: (state, action) => { state.selectProjectError = action.payload },
    }
})

export const {
    setAllChats,
    setAllChatsError,
    setAllChatsLoading,

    setAllProjects,
    setAllProjectsError,
    setAllProjectsLoading,

    setCreateProjectLoading,
    setCreateProjectError,

    setAddChatToProjectLoading,
    setAddChatToProjectError,

    setSelectedProject,
    setSelectedProjectLoading,
    setSelectedProjectError
} = projectSlice.actions

export default projectSlice.reducer