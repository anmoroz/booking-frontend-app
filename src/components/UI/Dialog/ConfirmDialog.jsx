import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";

const ConfirmDialog = ({showConfirmDialog, setShowConfirmDialog, callback, dialogText}) => {

    const handleClose = () => {
        setShowConfirmDialog(false);
    };

    const handleConfirm = () => {
        setShowConfirmDialog(false);
        callback();
    };

    return (
        <Dialog
            fullScreen={false}
            open={showConfirmDialog}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">

            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Отмена
                </Button>
                <Button onClick={handleConfirm}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;