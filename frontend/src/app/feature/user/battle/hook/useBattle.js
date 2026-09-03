import { useDispatch } from "react-redux";
import {setBattleMessageLoading , setBattleMessageError } from "../state/battle.state";
import { sendMessageForBattle } from "../services/battle.api";
import { toast } from "react-toastify";

export const useBattle = ()=> {
    const dispatch = useDispatch();

    const handleSendMessageForBattle = async (message) => {
        try {
            dispatch(setBattleMessageError(null));
            dispatch(setBattleMessageLoading(true));
            const res = await sendMessageForBattle(message)
            return res.data
        } catch (error) {
            dispatch(setBattleMessageError(error.message))
            toast.error(error.message)
        }finally{
            dispatch(setBattleMessageLoading(false));
        }
    }

    return {
        handleSendMessageForBattle
    }
}
