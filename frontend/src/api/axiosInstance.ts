import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"http://localhost:3070/api",
    withCredentials:true,
})