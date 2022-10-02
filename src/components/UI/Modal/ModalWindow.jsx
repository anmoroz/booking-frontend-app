import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import './ModalWindow.css'

const ModalWindow = ({open, handleClose, content, hideCloseButton}) => {
    return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="Modal-window">
                    {
                        !hideCloseButton &&
                        <IconButton
                            style={{ position: "absolute", top: "0", right: "0" }}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                    {content}
                </Box>
            </Modal>

    );
};

export default ModalWindow;