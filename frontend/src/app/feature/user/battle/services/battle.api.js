import { AxiosInstance } from "../../../../lib/axios.js";

export const sendMessageForBattle = async (message, chat) => {
    try {
        const res = await AxiosInstance.post('/battle/v1/ai/arena', { message , chat});
        return res.data
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
}

export const getBattleMessages = async (chatId) => {
    try {
        const res = await AxiosInstance.get(`/battle/v1/ai/${chatId}`);
        return res.data
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
}
