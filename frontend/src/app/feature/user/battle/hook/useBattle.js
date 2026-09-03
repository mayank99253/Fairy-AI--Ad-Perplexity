import { useDispatch } from "react-redux";
import {setBattleMessageLoading , setBattleMessageError, setBattleMessagesError, setBattleMessagesLoading, setBattleMessages } from "../state/battle.state";
import { getBattleMessages, sendMessageForBattle } from "../services/battle.api";
import { toast } from "react-toastify";
import { useChat } from "../../chat/hook/useChat";
import { useCallback } from "react";

export const useBattle = ()=> {
    const dispatch = useDispatch();
    const {handleGetChat} = useChat()

    const handleSendMessageForBattle = async (message , chatId) => {
        try {
            dispatch(setBattleMessageError(null));
            dispatch(setBattleMessageLoading(true));
            const data = await sendMessageForBattle(message , chatId)
            await handleGetChat()
            await handleGetBattleMessages(data.chat)
            return data.chat
        } catch (error) {
            dispatch(setBattleMessageError(error.message))
            toast.error(error.message)
        }finally{
            dispatch(setBattleMessageLoading(false));
        }
    }

    const handleGetBattleMessages = useCallback(async (chatId) => {
        try {
            dispatch(setBattleMessagesError(null));
            dispatch(setBattleMessagesLoading(true));
            const data = await getBattleMessages(chatId)
            dispatch(setBattleMessages([...data.messages]));
            return data.message
        } catch (error) {
            dispatch(setBattleMessagesError(error.message))
            toast.error(error.message)
        } finally {
            dispatch(setBattleMessagesLoading(false));
        }
    }, [dispatch])

    return {
        handleSendMessageForBattle,
        handleGetBattleMessages
    }
}
