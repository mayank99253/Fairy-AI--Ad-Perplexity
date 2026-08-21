import { useDispatch } from 'react-redux';

import {
    setAllChats,
    setAllChatsLoading,
    setAllChatsError,

    setAllProjects,
    setAllProjectsLoading,
    setAllProjectsError,

    setCreateProjectLoading,
    setCreateProjectError,

    setAddChatToProjectLoading,
    setAddChatToProjectError,
    setSelectedProject
} from '../state/project.slice';

import {
    createProject,
    addChatInProject,
    getAllProjectChat,
    getAllProjects
} from '../services/project.api';

import { toast } from 'react-toastify';
import { useCallback } from 'react';


export const useProject = () => {

    const dispatch = useDispatch();

    const handleCreateProject = async (title, description) => {

        try {

            dispatch(setCreateProjectLoading(true));
            dispatch(setCreateProjectError(null));

            const data = await createProject(title, description);
            await handleGetAllProjects();
            toast.success(data.message);
            return data;

        } catch (error) {

            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to create project";

            dispatch(setCreateProjectError(errorMessage));

            toast.error(errorMessage);

            throw error;

        } finally {

            dispatch(setCreateProjectLoading(false));

        }
    };


    const handleAddChatToProject = async (projectId, chatId) => {

        try {

            dispatch(setAddChatToProjectLoading(true));
            dispatch(setAddChatToProjectError(null));

            const data = await addChatInProject(projectId, chatId);

            toast.success(data.message);

            return data;

        } catch (error) {

            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to add chat to project";

            dispatch(setAddChatToProjectError(errorMessage));

            toast.error(errorMessage);

            throw error;

        } finally {

            dispatch(setAddChatToProjectLoading(false));

        }
    };


    const handleGetAllProjectChat = useCallback(async (projectId) => {

        try {

            dispatch(setAllChatsLoading(true));
            dispatch(setAllChatsError(null));

            const data = await getAllProjectChat(projectId);

            dispatch(setAllChats([...data.chats]));
            dispatch(setSelectedProject(data.project));

            return data;

        } catch (error) {

            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to fetch project chats";

            dispatch(setAllChatsError(errorMessage));

            toast.error(errorMessage);

            throw error;

        } finally {

            dispatch(setAllChatsLoading(false));

        }
    },[dispatch])

    const handleGetAllProjects = useCallback(async () => {
        try {
            dispatch(setAllProjectsLoading(true));
            dispatch(setAllProjectsError(null));
            const data = await getAllProjects();
            dispatch(setAllProjects([...data.projects]));
            return data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to fetch projects";
            dispatch(setAllProjectsError(errorMessage));
            toast.error(errorMessage);
            throw error;
        } finally {
            dispatch(setAllProjectsLoading(false));
        }
    }, [dispatch])


    return {
        handleCreateProject,
        handleAddChatToProject,
        handleGetAllProjectChat,
        handleGetAllProjects
    };
};