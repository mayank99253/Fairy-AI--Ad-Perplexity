import { createBrowserRouter } from "react-router-dom";
import Login from "../feature/pages/Login";
import Signup from "../feature/pages/Signup";

export const route = createBrowserRouter([
    {
        path : "/login",
        element: <Login />
    },
    {
        path : "/signup",
        element: <Signup />
    },
])