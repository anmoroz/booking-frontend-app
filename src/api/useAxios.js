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

    const clearTokensAndReloadPage = () => {
        localStorageService.clearToken();
        window.location.reload();
    }

    const refresh = async (refreshToken) => {
        axiosInstance.post(
            "/security/refresh-token",
            {refreshToken: refreshToken}
        ).then((response) => {
            localStorageService.setToken(response.data)
            window.location.reload();
        }).catch(() => {
            clearTokensAndReloadPage()
        })
    }

    axiosInstance.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        if (error.response.status === 401) {
            localStorageService.removeAccessToken()
            if (localStorageService.getRefreshToken()) {
                await refresh(localStorageService.getRefreshToken())
            } else {
                clearTokensAndReloadPage()
            }
        }

        return Promise.reject(error);
    })

    return axiosInstance;
};

export default useAxios;