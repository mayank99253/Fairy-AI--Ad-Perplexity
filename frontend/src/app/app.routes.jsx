import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from './feature/auth/pages/Login'
import Signup from "./feature/auth/pages/Signup";
import Home from "./feature/user/Home/Home";
import BattleArena from "./components/pages/BattleArena"
import ChatPage from "./feature/user/chat/shared/ChatPage"
import Setting from "./components/pages/Setting";
import NewChat from "./components/pages/NewChat";
import Library from './feature/user/feature/shared/Library' 
import Search from './feature/user/feature/shared/Search' 
import Projects from "./feature/user/project/pages/Projects";
import ProjectChats from "./feature/user/project/pages/ProjectChats";

export const router = (user) => createBrowserRouter([
    {
        path: "/login",
        element: user ? <Navigate to='/' replace /> : <Login />
    },
    {
        path: "/",
        element: user ? <Home /> : <Navigate to='/login' replace />,
        children: [
            { element: <NewChat />, index: true },
            { path: 'search', element: <Search /> },
            { path: 'library', element: <Library /> },
            { path: 'setting', element: <Setting /> },
            { path: 'projects', element: <Projects /> },
            { path: ':projectId/chats', element: <ProjectChats /> },
            { path: 'battle-arena', element: <BattleArena /> },
            { path: ':chatId', element: <ChatPage /> },
        ]
    },
    {
        path: "/signup",
        element: user ? <Navigate to='/' replace /> : <Signup />
    },
])