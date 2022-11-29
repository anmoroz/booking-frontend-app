import React from 'react';
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';


const Advantages = () => {
    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={6} className="Home_gridContainer">
                    <Grid item xs={12} md={12}>
                        <Typography variant="h4" fontWeight={500} className="Home_title">
                            Приемущества
                        </Typography>
                        <List sx={{ width: '100%' }} aria-label="contacts">
                            <ListItem>
                                <ListItemIcon>
                                    <StarIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{fontSize: '20px'}}
                                    primary="Простота приложения"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <StarIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{fontSize: '20px'}}
                                    primary="Возможность одновременно работать с разных устройств"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <StarIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{fontSize: '20px'}}
                                    primary="Ведение нескольких объектов размещения"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <StarIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{fontSize: '20px'}}
                                    primary="Учет бронирований в удобном календаре"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <StarIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{fontSize: '20px'}}
                                    primary="Просмотр статистики помесячно по каждому объекту"
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Advantages;