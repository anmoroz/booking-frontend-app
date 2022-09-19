import React, {useContext, useState} from 'react';
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {AuthContext} from "../context";
import Button from "@mui/material/Button";


const LoginPage = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={login}
        >
            <Box m={1} p={1}>
                <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    variant="standard"
                    size="small"
                    value={credentials.email}
                    onChange={e => setCredentials({...credentials, email: e.target.value})}
                />
            </Box>
            <Box m={1} p={1}>
                <TextField
                    fullWidth
                    id="password"
                    type="password"
                    label="Пароль"
                    variant="standard"
                    size="small"
                    value={credentials.password}
                    onChange={e => setCredentials({...credentials, password: e.target.value})}
                />
            </Box>
            <Box m={1} p={1}>
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="small"
                >
                    Войти
                </Button>
            </Box>
        </Box>
    );
};

export default LoginPage;