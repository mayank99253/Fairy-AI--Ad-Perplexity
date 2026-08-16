import {useDispatch } from 'react-redux'
import { setChats , setChatsError ,setChatsLoading ,setMessages ,setMessagesError ,setMessagesLoading } from '../state/chat.slice'
import { sendMessage , getChatMessage , getChats, deleteChat } from '../services/chat.api'
import {toast} from 'react-toastify'
import { useCallback } from 'react'

export const useChat = ()=>{
    const dispatch = useDispatch();

    const handleSendMessage = async(message ,chatId)=>{
        try {
            dispatch(setMessagesLoading(true));
            dispatch(setMessagesError(null));
            const data = await sendMessage(message , chatId);
            // update the chat container UI 
            await handleGetChatMessage(data?.chat)
            // update the Chat List
            await handleGetChat()
            return data
        } catch (error) {
            toast.error(error.message);
            dispatch(setMessagesError(error.message));
        }finally{
            dispatch(setMessagesLoading(false))
        }
    };

    const handleGetChatMessage = useCallback(async(chatId)=>{
         try {
             dispatch(setMessagesLoading(true));
            dispatch(setMessages([]))
            dispatch(setMessagesError(null));
            const data = await getChatMessage(chatId);
            dispatch(setMessages([...data.messages]))
            return data.message;
        } catch (error) {
            toast.error(error.message);
            dispatch(setMessagesError(error.message));
        }finally{
            dispatch(setMessagesLoading(false))
        }
    }, [dispatch]);

    const handleGetChat = useCallback(async()=>{
         try {
            dispatch(setChatsLoading(true));
            dispatch(setChatsError(null));
            const data = await getChats();
            dispatch(setChats([...data.chat]))
            return data.message;
        } catch (error) {
            toast.error(error.message);
            dispatch(setChatsError(error.message));
        }finally{
            dispatch(setChatsLoading(false))
        }
    }, [dispatch]);
    
    const handleDeleteChat = async(chatId)=>{
         try {
            dispatch(setChatsLoading(true));
            dispatch(setChatsError(null));
            const data = await deleteChat(chatId);
            //call again the get handle chats
            await handleGetChat()
            return data.message;
        } catch (error) {
            toast.error(error.message);
            dispatch(setChatsError(error.message));
        }finally{
            dispatch(setChatsLoading(false))
        }
    };

    return {
        handleSendMessage,
        handleGetChatMessage,
        handleGetChat,
        handleDeleteChat,
    }
}