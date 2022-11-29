import React, {useContext, useState} from 'react';
import SignUpService from "../../api/SignUpService";
import DialogContent from "@mui/material/DialogContent";
import {Button, TextField, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import DialogActions from "@mui/material/DialogActions";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import {AuthContext} from "../../context/AuthProvider";
import FormHelperText from "@mui/material/FormHelperText"


const StepThreeForm = (props) => {
    const signUpService = SignUpService
    const { auth } = useContext(AuthContext);

    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errMsg, setErrMsg] = useState('');
    const [signUpInProgress, setSignUpInProgress] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [formErrorMessages, setFormErrorMessages] = React.useState({});

    const handleConfirm = (e) => {
        e.preventDefault();
        setSignUpInProgress(true);
        setFormErrorMessages({})
        sendConfirm()
            .then((data) => {
                auth(data.accessToken, data.refreshToken)
                props.closeSignUpForm()
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setFormErrorMessages(error.response.data.message)
                } else {
                    setErrMsg('Произошла ошибка на сервере');
                }
            })
            .finally(() => {
                setSignUpInProgress(false);
            });
    };

    async function sendConfirm() {
        return await signUpService.confirm(password, name, props.token);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <DialogContent sx={{minWidth: "500px"}}>
                <Typography color="#444" variant="h5" component="h3">
                    Введите ваше имя и пароль
                </Typography>
                { signUpInProgress && <LinearProgress sx={{ width: '100%' }} /> }
                { errMsg && <Alert severity="error" style={{whiteSpace: "pre-wrap"}}>{errMsg}</Alert> }
                <TextField
                    error={formErrorMessages.hasOwnProperty("name")}
                    sx={{marginTop: "10px"}}
                    fullWidth
                    label="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    helperText={formErrorMessages.hasOwnProperty("name") ? formErrorMessages.name : ''}
                />
                <FormControl
                    fullWidth
                    variant="outlined"
                    sx={{marginTop: "10px"}}
                >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        error={formErrorMessages.hasOwnProperty("password")}
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Показать пароль"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Пароль"
                    />
                    {formErrorMessages.hasOwnProperty("password") && (
                        <FormHelperText error id="password-error">
                            {formErrorMessages.password ?? ''}
                        </FormHelperText>
                    )}
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "left", padding: "0 0 18px 24px" }}>
                <Button
                    variant="contained"
                    disabled={signUpInProgress}
                    onClick={handleConfirm}
                >
                    Завершить регистрацию
                </Button>
            </DialogActions>
        </>
    );
};

export default StepThreeForm;