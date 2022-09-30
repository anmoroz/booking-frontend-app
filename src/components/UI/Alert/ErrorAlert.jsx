import React from 'react';
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

const ErrorAlert = ({errorMessage}) => {
    return (
        <div>
            {
                errorMessage &&
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="filled" severity="error" style={{whiteSpace: "pre-wrap"}}>
                        {errorMessage}
                    </Alert>
                </Stack>
            }
        </div>
    );
};

export default ErrorAlert;