import React from 'react'
import useAxios from '../api/useAxios'
import LocalStorageService from "../service/LocalStorageService";

export const AuthContext = React.createContext(null);

const localStorageService = LocalStorageService.getService();

export const AuthProvider = ({ children }) => {
    const api = useAxios()

    const [authState, setAuthState] = React.useState({
        accessToken: localStorageService.getAccessToken(),
        refreshToken: localStorageService.getRefreshToken(),
        authenticated: localStorageService.getAccessToken() !== null
    });

    React.useEffect(() => {
        if (authState.authenticated) {
            localStorageService.setToken({
                accessToken: authState.accessToken,
                refreshToken: authState.refreshToken
            })
        } else {
            localStorageService.clearToken();
        }
    }, [authState])

    const logout = () => {
        setAuthState({
            accessToken: null,
            refreshToken: null,
            authenticated: false
        });
    }

    const login = async (email, password, successCallback, errorCallback) => {
        api.post(
            "/security/authenticate",
            {email: email, password: password }
        ).then((response) => {
            setAuthState({
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                authenticated: true
            });
            successCallback();
        }).catch((error) => {
            errorCallback(error);
        });
    }

    let value = {
        authState: authState,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}