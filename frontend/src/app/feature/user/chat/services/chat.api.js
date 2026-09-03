import { AxiosInstance } from '../../../../lib/axios.js'

export const sendMessage = async (message, chat) => {
    try {
        const res = await AxiosInstance.post('/ai/v1/send-message', { message, chat });
        return res.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Something Went Wrong");
    }
}

export const getChatMessage = async (chatId) => {
    try {
        const res = await AxiosInstance.get(`/ai/v1/${chatId}/messages`);
        return res.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Something Went Wrong");
    }
}

export const getChats = async () => {
    try {
        const res = await AxiosInstance.get('/ai/v1/get-chats');
        return res.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Something Went Wrong");
    }
}

export const deleteChat = async (chatId) => {
    try {
        const res = await AxiosInstance.delete(`/ai/v1/${chatId}`);
        return res.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Something Went Wrong");
    }
}
export const getChatMode = async (chatId) => {
    try {
        const res = await AxiosInstance.get(`/ai/v1/${chatId}/mode`);
        return res.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Something Went Wrong");
    }
}