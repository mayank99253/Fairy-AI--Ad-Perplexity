import { AxiosInstance } from "../../../../lib/axios.js";

export const sendMessageForBattle = async (message) => {
    try {
        const res = await AxiosInstance.post('/battle/v1/ai/arena', { message });
        return res.data
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
}