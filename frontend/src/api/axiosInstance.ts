import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE == 'production' ? 'https://social-media-typescript-production.up.railway.app/api' :
     "http://localhost:3070/api",
    withCredentials:true,
})