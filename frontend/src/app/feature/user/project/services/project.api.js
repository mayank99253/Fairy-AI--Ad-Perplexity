import {AxiosInstance} from "../../../../lib/axios.js"

export const createProject = async (title , description) => {
    try {
        const res = await AxiosInstance.post('/project/v1/create-project' , { title , description });
        return res.data
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Something Went Wrong")
    }
}
export const addChatInProject = async (projectId , chatId) => {
    try {
        const res = await AxiosInstance.post(`/project/v1/add/${projectId}/${chatId}`,);
        return res.data
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Something Went Wrong")
    }
}
export const getAllProjectChat = async (projectId) => {
    try {
        const res = await AxiosInstance.get(`/project/v1/${projectId}/chats`);
        return res.data
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Something Went Wrong")
    }
}
export const getAllProjects = async () => {
    try {
        const res = await AxiosInstance.get(`/project/v1/projects`);
        return res.data
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Something Went Wrong")
    }
}