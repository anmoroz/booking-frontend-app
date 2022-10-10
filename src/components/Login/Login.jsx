import React, { useRef, useState, useEffect, useContext } from 'react';
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {AuthContext} from "../../context/AuthProvider";
import Button from "@mui/material/Button";
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";

import "./Login.css";

const Login = () => {
    const emailRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    const { login } = useContext(AuthContext);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleLogin = async () => {
        setLoginInProgress(true);

        let errorCallback = (error) => {
            setLoginInProgress(false);
            if (!error.response) {
                setErrMsg('No Server Response');
            } else if (error.response.status === 400) {
                setErrMsg(error.response.data.message);
            } else if (error.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }

        let successCallback = () => {
            setLoginInProgress(false);
        }

        await login(email, password, successCallback, errorCallback);
    }

    const handleKeydown = e => {
        if (e.keyCode === 13) {
            handleLogin()
        }
    };

    return (
        <Box
            noValidate
            autoComplete="off"
            className="LoginPage-form"
        >
            <Typography align="center" color="#444" variant="h5" component="h3">
                Авторизация
            </Typography>
            { loginInProgress &&
                <Box m={1} p={1}>
                    <LinearProgress sx={{ width: '100%' }} />
                </Box>
            }
            {
                errMsg &&
                <Box m={1} p={1}>
                    <Alert severity="error" style={{whiteSpace: "pre-wrap"}}>{errMsg}</Alert>
                </Box>
            }
            <Box m={1} p={1}>
                <TextField
                    ref={emailRef}
                    fullWidth
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Box>
            <Box m={1} p={1}>
                <TextField
                    fullWidth
                    type="password"
                    label="Пароль"
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeydown}
                />
            </Box>
            <Box m={1} p={1}>
                <Button
                    fullWidth
                    variant="contained"
                    disabled={loginInProgress}
                    onClick={handleLogin}
                >
                    Войти
                </Button>

            </Box>
        </Box>
    );
};

export default Login;