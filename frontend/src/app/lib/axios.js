import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL : "http://localhost:3000/api" || import.meta.env.VITE_BASE_URL ,
    withCredentials :true
});