// Third party
import axios, { AxiosResponse, AxiosError } from "axios";

// Configs
import envConf from "../config/envConfig";

const { apiBaseUrl } = envConf;

export const noAuthApi = axios.create({
    baseURL: `${apiBaseUrl}`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        language: "En",
    },
    withCredentials: false,
    responseType: "json",
});

const api = axios.create({
    baseURL: `${apiBaseUrl}`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: false,
    responseType: "json",
});

api.interceptors.request.use(
    async (config) => {
        config.headers = config.headers ?? {};
        config.params = config.params || {};
        const token = localStorage.getItem("token");
        const auth = token ? `Bearer ${token}` : "";

        config.headers.Authorization = auth;


        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    (error: AxiosError): Promise<AxiosError> => {
        if (error?.response?.status === 401) {
            localStorage.clear();
            window.location.href = `${window.location.origin}/login`;
        }
        return Promise.reject(error);
    }
);

export default api;
