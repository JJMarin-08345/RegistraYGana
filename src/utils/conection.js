import axios from "axios";

export const apiConection = axios.create({
    baseURL: import.meta.env.VITE_URL_BACK
})