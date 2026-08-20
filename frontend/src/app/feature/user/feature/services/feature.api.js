import { AxiosInstance } from "../../../../lib/axios.js";

export const getAllGenImages = async () => {
    try {
        const res = await AxiosInstance.get('/feature/v1/fetch-images')
        return res.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Something Went Wrong")
    }
} 
export const getAllChats = async () => {
    try {
        const res = await AxiosInstance.get('/feature/v1/fetch-chats')
        return res.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Something Went Wrong")
    }
} 