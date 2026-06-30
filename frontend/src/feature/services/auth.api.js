import axios from "axios";
import { toast } from "react-toastify";

const AxiosInstance = axios.create({
    baseURL : "http://localhost:3000/api/auth",
    withCredentials :true
});


export const register = async ({email , username , password}) => {
    try {
        const res = await AxiosInstance.post("/signup" , {
            username , email , password
        });
        return res.data
    } catch (error) {
        console.error(error)
        toast.error("Something Went Wrong")
    }
}
export const login = async ({email , password}) => {
    try {
        const res = await AxiosInstance.post("/login" , {
            email , password
        });
        return res.data
    } catch (error) {
        console.error(error)
        toast.error("Something Went Wrong")
    }
}
export const getme = async ({email , username , password}) => {
    try {
        const res = await AxiosInstance.post("/get-me")
        return res.data
    } catch (error) {
        console.error(error)
        toast.error("Something Went Wrong")
    }
}