import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:"auth",
    initialState : {
        user : null,
        isUserLoading:false,
        UserError :null
    },
    reducers:{
        setUser :(state, action)=>{state.user = action.payload},
        setisUserLoading :(state, action)=>{state.isUserLoading = action.payload},
        setUserError :(state, action)=>{state.UserError = action.payload},
    },
})

export const {setUser , setUserError,setisUserLoading} = authSlice.actions
export default authSlice.reducer