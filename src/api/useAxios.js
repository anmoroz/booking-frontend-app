import axios from "axios";
import LocalStorageService from "../service/LocalStorageService";

const useAxios = () => {
    const localStorageService = LocalStorageService.getService();

    const axiosInstance = axios.create({
        baseURL: "/api/v1",
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    axiosInstance.interceptors.request.use(async req => {
        let accessToken = localStorageService.getAccessToken();
        if (accessToken) {
            req.headers.Authorization = `Bearer ${accessToken}`
        }

        return req
    })

    return axiosInstance;
};

export default useAxios;