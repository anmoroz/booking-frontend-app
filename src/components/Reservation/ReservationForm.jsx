import React, {useState} from 'react';
import 'dayjs/locale/ru';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import {TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import Grid from '@mui/material/Grid';

import './ReservationForm.css';
import ConfirmDialog from "../UI/Dialog/ConfirmDialog";

const ReservationForm = ({selectedReservation, closeReservationForm, updateReservationHandler, deleteReservationHandler}) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)

    const [reservation, setReservation] = useState({
        id: (selectedReservation !== undefined) ? selectedReservation.id : undefined,
        name: (selectedReservation !== undefined && selectedReservation.contact) ? selectedReservation.contact.name : '',
        phone: (selectedReservation !== undefined && selectedReservation.contact) ? selectedReservation.contact.phone : '',
        adults: (selectedReservation !== undefined) ? selectedReservation.adults : 0,
        children: (selectedReservation !== undefined) ? selectedReservation.children : 0,
        note: (selectedReservation !== undefined) ? selectedReservation.note : "",
        checkin: (selectedReservation !== undefined) ? new Date(selectedReservation.checkin) : new Date(),
        checkout: (selectedReservation !== undefined) ? new Date(selectedReservation.checkout) : new Date(),
        isClose: selectedReservation === undefined || selectedReservation.contact === null
    });

    const saveReservationFormHandler = (event) => {
        event.preventDefault();

        console.log(JSON.stringify(reservation))


        updateReservationHandler(reservation)
        closeReservationForm()
    }

    const deleteReservation = () => {
        deleteReservationHandler(selectedReservation)
        closeReservationForm()
    }

    return (
        <div>
            <Typography id="modal-modal-title" variant="h5" component="h3" m={1} p={1}>
                {reservation.isClose ? <span>Бронирование закрыто</span> : <span>Бронирование</span>}
            </Typography>


            <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru" >
                            <DesktopDatePicker
                                label={reservation.isClose ? "От" : "Прибытие"}
                                inputFormat="DD.MM.YYYY"
                                value={reservation.checkin}
                                onChange={newCheckinDate => {
                                    setReservation(
                                        {...reservation, checkin: new Date(newCheckinDate.format("YYYY-MM-DD"))}
                                    )
                                }}
                                renderInput={(params) => <TextField fullWidth size="small" {...params} />}

                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru" >
                            <DesktopDatePicker
                                label={reservation.isClose ? "До" : "Выезд"}
                                inputFormat="DD.MM.YYYY"
                                value={reservation.checkout}
                                onChange={newCheckoutDate => {
                                    setReservation(
                                        {...reservation, checkout: new Date(newCheckoutDate.format("YYYY-MM-DD"))}
                                    )
                                }}
                                renderInput={(params) => <TextField fullWidth size="small" {...params} />}

                            />
                        </LocalizationProvider>
                    </Grid>
                    {
                        !reservation.isClose &&
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="adults"
                                select
                                label="Взрослых"
                                variant="outlined"
                                size="small"
                                defaultValue={reservation.adults}
                                onChange={e => setReservation({...reservation, adults: e.target.value})}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                            </TextField>
                        </Grid>
                    }
                    {
                        !reservation.isClose &&
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="children"
                                select
                                label="Детей"
                                variant="outlined"
                                size="small"
                                defaultValue={reservation.children}
                                onChange={e => setReservation({...reservation, children: e.target.value})}
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                            </TextField>
                        </Grid>
                    }

                    <Grid item xs={12}>
                        {
                            !reservation.isClose &&
                            <TextField
                                fullWidth
                                id="name"
                                label="Имя"
                                variant="outlined"
                                size="small"
                                value={reservation.name}
                                onChange={e => setReservation({...reservation, name: e.target.value})}
                            />
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            !reservation.isClose &&
                            <TextField
                                fullWidth
                                id="phone"
                                label="Телефон"
                                variant="outlined"
                                size="small"
                                value={reservation.phone}
                                onChange={e => setReservation({...reservation, phone: e.target.value})}
                            />
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="note"
                            type="text"
                            rows={2}
                            multiline
                            style={{ width: '100%' }}
                            label="Примечание"
                            value={reservation.note}
                            onChange={e => setReservation({...reservation, note: e.target.value})}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box
                component="span"
                m={1}
                p={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    onClick={saveReservationFormHandler}
                >
                    Сохранить
                </Button>
                <div>
                    <Button
                        color="secondary"
                        type="button"
                        variant="contained"
                        size="small"
                        style={{marginRight: "5px"}}
                        onClick={() => setShowConfirmDialog(true)}
                    >
                        {reservation.isClose ? "Открыть бронирование" : "Отменить бронирование"}
                    </Button>
                    <Button variant="outlined" size="small" onClick={closeReservationForm}>Отмена</Button>
                </div>
            </Box>
            <ConfirmDialog
                showConfirmDialog={showConfirmDialog}
                setShowConfirmDialog={setShowConfirmDialog}
                callback={() => {deleteReservation()}}
                dialogText={reservation.isClose ? "Вы действительно хотите открыть бронирование?" : "Вы действительно хотите удалить бронь?"}
            />
        </div>
    );
};

export default ReservationForm;