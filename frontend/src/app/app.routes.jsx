import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from './feature/auth/pages/Login'
import Signup from "./feature/auth/pages/Signup";
import Home from "./feature/user/Home/Home";
import BattleArena from "./components/pages/BattleArena"
import ChatPage from "./feature/user/chat/shared/ChatPage"
import Setting from "./components/pages/Setting";
import Library from "./components/pages/Library";
import Search from "./components/pages/Search";
import Projects from "./components/pages/Projects";
import NewChat from "./components/pages/NewChat";

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
            { path: 'battle-arena', element: <BattleArena /> },
            { path: ':chatId', element: <ChatPage /> },
        ]
    },
    {
        path: "/signup",
        element: user ? <Navigate to='/' replace /> : <Signup />
    },
])