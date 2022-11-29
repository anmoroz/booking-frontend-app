import React, {useState} from 'react';
import {Button, TextField, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import SignUpService from "../../api/SignUpService";

const StepOneForm = (props) => {
    const signUpService = SignUpService

    const [errMsg, setErrMsg] = useState('');
    const [signUpInProgress, setSignUpInProgress] = React.useState(false);

    const handleSignUp = (e) => {
        e.preventDefault();
        setSignUpInProgress(true);
        sendSignUp(props.email)
            .then(() => {
                props.setStep(2);
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setErrMsg(error.response.data.message);
                } else {
                    setErrMsg('Произошла ошибка на сервере');
                }
            })
            .finally(() => {
                setSignUpInProgress(false);
            });
    };

    async function sendSignUp(email) {
        await signUpService.signUp(email);
    }

    return (
        <>
            <DialogContent sx={{minWidth: "500px"}}>
                <Typography color="#444" variant="h5" component="h3">
                    Регистрация
                </Typography>
                { signUpInProgress && <LinearProgress sx={{ width: '100%' }} /> }
                { errMsg && <Alert severity="error" style={{whiteSpace: "pre-wrap"}}>{errMsg}</Alert> }
                <TextField
                    sx={{marginTop: "10px"}}
                    fullWidth
                    label="Электронная почта"
                    value={props.email}
                    onChange={(e) => props.setEmail(e.target.value)}
                    helperText="На указанный email поступит сообщение с кодом"
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: "left", padding: "0 0 18px 24px" }}>
                <Button
                    variant="contained"
                    disabled={signUpInProgress}
                    onClick={handleSignUp}
                >
                    Получить код
                </Button>
            </DialogActions>
        </>
    );
};

export default StepOneForm;