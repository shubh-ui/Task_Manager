import axios from "axios";
import { BASE_URL } from "./api-path";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
});


// Request Interceptor

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// Responce Interceptor

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.responce) {
            if (error.responce.status == 401) {
                window.location.href = "/login";
            }
            else if (error.responce.status == 500) {
                console.error("Server error. Please try again later");
            }
            else if (error.code == "ECONNABORTED") {
                console.error("Request timeout. Plase try again later");
            }
        }
        return Promise.reject
    }
)