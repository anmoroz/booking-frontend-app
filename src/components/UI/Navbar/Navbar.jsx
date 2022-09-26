import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import AdbIcon from '@mui/icons-material/Adb';
import Button from "@mui/material/Button";

const Navbar = ({logout}) => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <AdbIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Бронирования
                    </Typography>
                    <Button color="inherit" onClick={logout}>Выход</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;