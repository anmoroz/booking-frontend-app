import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <Box sx={{ flexGrow: 1 }} className="Home_footerContainer">
            <Typography className="Home_footerText">
                <Link href="mailto: booking-note@yandex.ru" underline="none" sx={{cursor: "pointer"}}>
                    booking-note@yandex.ru
                </Link>
            </Typography>
            <Typography className="Home_footerDate">Copyright © {year} Andrey Morozov. All rights reserved.</Typography>
        </Box>
    );
};

export default Footer;