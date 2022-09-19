import * as React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import './ModalWindow.css'


const ModalWindow = ({open, handleClose, content}) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="Modal-window">
                    {content}
                </Box>
            </Modal>
        </div>
    );
};

export default ModalWindow;