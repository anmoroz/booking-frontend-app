import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";
import WarningIcon from "@mui/icons-material/ErrorOutline";
import Divider from "@mui/material/Divider";
import Typography from '@mui/material/Typography';
import {formatPhone} from "../../utils/PhoneFormatter";

const ContactView = ({contact}) => {

    return (
        <Box sx={{ p: 2, display: 'flex' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h4">
                        Контакт
                    </Typography>
                </Grid>
                <Grid item xs={3} display="flex" justifyContent="flex-end">
                    Телефон:
                </Grid>
                <Grid item xs={9}>
                    {formatPhone(contact.phone)}
                </Grid>
                <Grid item xs={3} display="flex" justifyContent="flex-end">
                    Имя:
                </Grid>
                <Grid item xs={9}>
                    {contact.name}
                </Grid>
                <Grid item xs={3} display="flex" justifyContent="flex-end">
                    Создан:
                </Grid>
                <Grid item xs={9}>
                    {dayjs(contact.createdAt).format("DD.MM.YYYY")}
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={9} className="view_note">
                    {contact.note}
                </Grid>
                {
                    contact.isBanned &&
                    <Grid item xs={3} display="flex" justifyContent="flex-end">
                        <Chip
                            component={'span'}
                            icon={<WarningIcon />}
                            label="Забанен"
                            color="error"
                            size="small"
                            sx={{ marginRight: '10px' }}
                        />
                    </Grid>
                }
                {
                    contact.lastReservation &&
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Divider />
                            <Typography variant="h6" component="h6">Последняя бронь</Typography>
                        </Grid>
                        <Grid item xs={3} display="flex" justifyContent="flex-end">
                            Объект:
                        </Grid>
                        <Grid item xs={9}>
                            {contact.lastReservation.room.name}
                        </Grid>
                        <Grid item xs={3} display="flex" justifyContent="flex-end">
                            Прибытие:
                        </Grid>
                        <Grid item xs={9}>
                            {dayjs(contact.lastReservation.checkin).format("DD.MM.YYYY")}
                        </Grid>
                        <Grid item xs={3} display="flex" justifyContent="flex-end">
                            Выезд:
                        </Grid>
                        <Grid item xs={9}>
                            {dayjs(contact.lastReservation.checkout).format("DD.MM.YYYY")}
                        </Grid>
                        <Grid item xs={3} display="flex" justifyContent="flex-end">
                            Взрослые:
                        </Grid>
                        <Grid item xs={9}>
                            {contact.lastReservation.adults}
                        </Grid>
                        <Grid item xs={3} display="flex" justifyContent="flex-end">
                            Дети:
                        </Grid>
                        <Grid item xs={9}>
                            {contact.lastReservation.children}
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={9} className="view_note">
                            {contact.lastReservation.note}
                        </Grid>
                    </React.Fragment>
                }
            </Grid>
        </Box>
    );
};

export default ContactView;