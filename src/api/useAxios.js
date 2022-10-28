import React from 'react';
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

    axiosInstance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (error.response.status === 401) {
            localStorageService.clearToken();
            window.location.reload();
        }

        return Promise.reject(error);
    })

    return axiosInstance;
};

export default useAxios;