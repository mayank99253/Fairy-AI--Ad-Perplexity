import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from './feature/auth/pages/Login'
import Signup from "./feature/auth/pages/Signup";
import Home from "./feature/user/Home/Home";

export const router = (user)=> createBrowserRouter([
    {
        path : "/login",
        element: user ? <Navigate to='/' replace /> : <Login />
    },
    {
        path : "/",
        element: user ? <Home />: <Navigate to='/login' replace /> 
    },
    {
        path : "/signup",
        element: user ? <Navigate to='/' replace /> : <Signup />
    },
])