import React from 'react';
import Dialog from '@mui/material/Dialog';
import Zoom from '@mui/material/Zoom';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom timeout={300} ref={ref} {...props} />;
});

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: "10px 16px" }} {...other}>
            <Typography variant="h5" component="h3">
                {children}
            </Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

const ModalWindow = ({open, handleClose, title, content}) => {

    return (
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                {
                    title &&
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        {title}
                    </BootstrapDialogTitle>
                }
                {content}
            </Dialog>
    );
};

export default ModalWindow;