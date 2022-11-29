import React from 'react';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Container from '@mui/material/Container';

const PhoneInstall = () => {
    return (
        <Container>
            <Box className="Home_aboutUsContainer">
                <Grid container spacing={6} className="Home_gridContainer">
                    <Grid item xs={12} md={3}>
                        <img src="/home/phone.png" alt="iPhone" />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" fontWeight={500} className="Home_title">
                            Как создать ярлык на домашнем экране iPhone или iPad
                        </Typography>
                            <ol>
                                <li >Нажмите на кнопку Поделиться (если вы не видите нижнего меню, нажмите внизу экрана).</li>
                                <li>В появившемся меню выберите На экран «Домой».</li>
                                <li>Нажмите кнопку Добавить. На экране вашего iPhone или iPad появится ярлык.</li>
                            </ol>
                        <Typography variant="h4" fontWeight={500} className="Home_title">
                            Как создать ярлык на домашнем экране Android
                        </Typography>
                            <ol>
                                <li>Нажмите на три точки в верхнем левом углу окна Chrome.</li>
                                <li>Нажмите «Добавить на главный экран».</li>
                            </ol>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default PhoneInstall;