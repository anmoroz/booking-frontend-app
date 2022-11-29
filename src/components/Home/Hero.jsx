import React from 'react';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";


const Hero = ({openSignUpForm}) => {

    return (
        <Container>
            <Box className="Home_heroBox">
                <Grid container spacing={6} className="Home_gridContainer">
                    <Grid item xs={12} md={7}>
                        <Typography variant="h3" fontWeight={700} className="Home_title">
                            Учет бронирований - легко
                        </Typography>
                        <Typography variant="h6" className="Home_subtitle">
                            <strong>Booking note</strong> - простой и бесплатный сервис для арендодателей квартир, домов, управляющих гостиниц и хостелов.
                            Для ведения базы клиентов и бронирований. Оптимизирован для работы с мобильных устройств.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ width: '200px', fontSize: '16px' }}
                            onClick={openSignUpForm}
                        >
                            Регистрация
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <img src="/home/calendar.jpg" alt="Календарь" className="Home_largeImage" />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Hero;