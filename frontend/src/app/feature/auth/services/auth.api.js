import { AxiosInstance } from "../../../lib/axios.js";


export const register = async (email, username, password) => {
    try {
        const res = await AxiosInstance.post("/auth/v1/signup", {
            username, email, password
        });
        return res.data
    } catch (error) {
        console.error(error)
        throw error.response?.data?.message || "Something Went Wrong"
    }
}
export const login = async (identifier, password) => {
    try {
        const res = await AxiosInstance.post("/auth/v1/login", {
            identifier, password
        });
        return res.data
    } catch (error) {
        console.error(error);
        throw error.response?.data?.message || "Something Went Wrong"
    }
}
export const logout = async () => {
    try {
        const res = await AxiosInstance.post("/auth/v1/logout");
        return res.data
    } catch (error) {
        console.error(error);
        throw error.response?.data?.message || "Something Went Wrong"
    }
}
export const getme = async () => {
    try {
        const res = await AxiosInstance.get("/auth/v1/get-user")
        return res.data
    } catch (error) {
        console.error(error)
        throw error.response?.data?.message || "Something Went Wrong"
    }
}