import React, {createContext, useEffect, useState} from 'react'
import axios from "../api/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        accessToken: null,
        refreshToken: null,
        authenticated: false
    });

    useEffect(() => {
        if (authState.authenticated) {
            localStorage.removeItem('accessToken');
        } else {
            localStorage.setItem('accessToken', authState.accessToken);
        }
    }, [authState])

    const getAccessToken = () => {
        return authState.accessToken;
    };

    const logout = () => {
        setAuthState({
            accessToken: null,
            refreshToken: null,
            authenticated: false
        });
    }

    const login = async (email, password, successCallback, errorCallback) => {
        axios.post(
            "/api/v1/security/authenticate",
            {email: email, password: password }
        ).then((response) => {
            setAuthState({
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                authenticated: true
            });
            successCallback(response);
        }).catch((error) => {
            errorCallback(error);
        });
    }

    let value = {
        authState: authState,
        getAccessToken: getAccessToken,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}