import { useDispatch } from "react-redux";
import { setAllChats, setAllChatsError, setAllChatsLoading, setGenImages, setGenImagesError, setGenImagesLoading } from "../state/feature.slice";
import { getAllChats, getAllGenImages } from "../services/feature.api";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const useFeature = () => {
    const dispatch = useDispatch();

    const handleGetAllGenImages = useCallback(async () => {
        try {
            dispatch(setGenImagesError(null));
            dispatch(setGenImagesLoading(false));
            const data = await getAllGenImages();
            dispatch(setGenImages([...data.imagesUrl]));
            return data.message
        } catch (error) {
            toast.error(error.message);
            dispatch(setGenImagesError(error.message));
        } finally {
            dispatch(setGenImagesLoading(false))
        }
    }, [dispatch]);

    const handleAllChats = useCallback(async () => {
        try {
            dispatch(setGenImagesError(null));
            dispatch(setGenImagesLoading(false));
            const data = await getAllChats();
            dispatch(setAllChats([...data.allChats]));
            console.log(data);
            return data.message
        } catch (error) {
            toast.error(error.message);
            dispatch(setAllChatsError(error.message));
        } finally {
            dispatch(setAllChatsLoading(false))
        }
    }, [dispatch]);


    return{
        handleGetAllGenImages,
        handleAllChats
    }
}