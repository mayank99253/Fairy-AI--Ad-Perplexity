import { useDispatch } from "react-redux";
import { setUser , setUserError , setisUserLoading } from "../state/auth.slice.js";
import { register , login , logout , getme } from "../services/auth.api.js";
import { toast } from "react-toastify";
import { useCallback } from "react";

export const useAuth = ()=>{
    const dispatch = useDispatch()

    const handleRegister = async (email , username , password) => {
        try {
            dispatch(setisUserLoading(true));
            dispatch(setUserError(null));
            const data = await register(email , username , password);
            dispatch(setUser(data.user));
            toast.success(data.message);
            return data.message;
        } catch (error) {
            toast.error(error)
            dispatch(setUserError(error)); 
        }finally{
            dispatch(setisUserLoading(false))
        }
    }
    const handleLogin = async (identifier, password) => {
        try {
            dispatch(setisUserLoading(true));
            dispatch(setUserError(null));
            const data = await login(identifier, password);
            dispatch(setUser(data.user));
            await handleGetMe()
            toast.success(data.message);
            return data.message;
        } catch (error) {
            toast.error(error)
            dispatch(setUserError(error)); 
        }finally{
            dispatch(setisUserLoading(false))
        }
    }
    const handleLogout = async () => {
        try {
            dispatch(setisUserLoading(true));
            dispatch(setUserError(null));
            const data = await logout();
            dispatch(setUser(null));
            toast.success(data.message);
            return data.message;
        } catch (error) {
            toast.error(error)
            dispatch(setUserError(error)); 
        }finally{
            dispatch(setisUserLoading(false))
        }
    }
    const handleGetMe = useCallback(async () => {
        try {
            dispatch(setisUserLoading(true));
            dispatch(setUserError(null));
            const data = await getme();
            dispatch(setUser(data.user));
            return data.message;
        } catch (error) {
            toast.error(error)
            dispatch(setUserError(error)); 
        }finally{
            dispatch(setisUserLoading(false))
        }
    },[dispatch])

    return {
        handleRegister ,
        handleLogin ,
        handleLogout ,
        handleGetMe
    }
}