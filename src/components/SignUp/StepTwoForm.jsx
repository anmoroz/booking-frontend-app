import React, {useState} from 'react';
import {Button, TextField, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import SignUpService from "../../api/SignUpService";

const StepTwoForm = (props) => {
    const signUpService = SignUpService

    const [confirmationCode, setConfirmationCode] = React.useState('');
    const [errMsg, setErrMsg] = useState('');
    const [signUpInProgress, setSignUpInProgress] = React.useState(false);

    const handleVerify = (e) => {
        e.preventDefault();
        setSignUpInProgress(true);
        sendVerify(confirmationCode)
            .then((data) => {
                props.setStep(3);
                props.setToken(data.token)
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

    async function sendVerify(confirmationCode) {
        return await signUpService.verify(props.email, confirmationCode);
    }

    return (
        <>
            <DialogContent sx={{minWidth: "500px"}}>
                <Typography color="#444" variant="h5" component="h3">
                    Введите код из письма
                </Typography>
                { signUpInProgress && <LinearProgress sx={{ width: '100%' }} /> }
                { errMsg && <Alert severity="error" style={{whiteSpace: "pre-wrap"}}>{errMsg}</Alert> }
                <TextField
                    sx={{marginTop: "10px", width: "80px"}}
                    label="Код"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: "left", padding: "0 0 18px 24px" }}>
                <Button
                    variant="contained"
                    disabled={signUpInProgress}
                    onClick={handleVerify}
                >
                    Продолжить
                </Button>
            </DialogActions>
        </>
    );
};

export default StepTwoForm;