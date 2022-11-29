import React, { useRef, useState, useEffect, useContext } from 'react';
import {TextField} from "@mui/material";
import {AuthContext} from "../../context/AuthProvider";
import Button from "@mui/material/Button";
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";


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
        <>
            <DialogContent sx={{minWidth: "500px"}}>
                <Typography align="center" color="#444" variant="h5" component="h3">
                    Авторизация
                </Typography>
                { loginInProgress && <LinearProgress sx={{ width: '100%' }} /> }
                { errMsg && <Alert severity="error" style={{whiteSpace: "pre-wrap"}}>{errMsg}</Alert> }
                <TextField
                    sx={{marginTop: "10px"}}
                    ref={emailRef}
                    fullWidth
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    sx={{marginTop: "10px"}}
                    fullWidth
                    type="password"
                    label="Пароль"
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeydown}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: "left", margin: "8px" }}>
                <Button
                    variant="contained"
                    disabled={loginInProgress}
                    onClick={handleLogin}
                >
                    Войти
                </Button>
            </DialogActions>
        </>
    );
};

export default Login;