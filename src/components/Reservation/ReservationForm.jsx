import React from 'react';
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
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ConfirmDialog from "../UI/Dialog/ConfirmDialog";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import './ReservationForm.css';

const ReservationForm = ({
     selectedReservation,
     closeReservationForm,
     saveReservation,
     deleteReservation
}) => {
    const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(false);
    const [blockButtons, setBlockButtons] = React.useState(false);

    const [reservation, setReservation] = React.useState({
        id: (selectedReservation.hasOwnProperty('id')) ? selectedReservation.id : undefined,
        name: (selectedReservation.hasOwnProperty('contact') && selectedReservation.contact) ? selectedReservation.contact.name : '',
        phone: (selectedReservation.hasOwnProperty('contact') && selectedReservation.contact) ? selectedReservation.contact.phone : '',
        adults: (selectedReservation.hasOwnProperty('adults')) ? selectedReservation.adults : 1,
        children: (selectedReservation.hasOwnProperty('children')) ? selectedReservation.children : 0,
        note: (selectedReservation.hasOwnProperty('note')) ? selectedReservation.note : "",
        checkin: new Date(selectedReservation.checkin),
        checkout: new Date(selectedReservation.checkout),
        isClose: !selectedReservation.hasOwnProperty('contact') || selectedReservation.contact === null,
        isNewReservation: selectedReservation.hasOwnProperty('isNewReservation')
    });

    const saveReservationFormHandler = (event) => {
        event.preventDefault();
        setBlockButtons(true);
        saveReservation(
            reservation,
            () => {
                closeReservationForm();
                setErrorMessage(false);
                setBlockButtons(false);
            },
            (message) => {
                setErrorMessage(message);
                setBlockButtons(false);
            }
        )
    }

    const deleteReservationHandler = () => {
        setBlockButtons(true);
        deleteReservation(
            selectedReservation,
            () => {
                closeReservationForm();
                setErrorMessage(false);
                setBlockButtons(false);
            },
            (message) => {
                setErrorMessage(message);
                setBlockButtons(false);
            }
        )
    }

    return (
        <div>
            {
                errorMessage &&
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="filled" severity="error" style={{whiteSpace: "pre-wrap"}}>
                        {errorMessage}
                    </Alert>
                </Stack>
            }
            {
                !reservation.isNewReservation &&
                <Typography id="modal-modal-title" variant="h5" component="h3" m={1} p={1}>
                    {reservation.isClose ? <span>Бронирование закрыто</span> : <span>Бронирование</span>}
                </Typography>
            }
            <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                <Grid container spacing={2}>
                    {
                        reservation.isNewReservation &&
                        <Grid item xs={12}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            defaultChecked
                                            onChange={
                                                (e) => {
                                                    setReservation({...reservation, isClose: e.target.checked});
                                                    setErrorMessage(false);
                                                }
                                        }
                                        />
                                    }
                                    label="Закрыть бронь"
                                />
                            </FormGroup>
                        </Grid>
                    }
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
                        (!reservation.isClose) &&
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
                    disabled={blockButtons}
                >
                    Сохранить
                </Button>
                <div>
                    {
                        !reservation.isNewReservation &&
                        <Button
                            color="secondary"
                            type="button"
                            variant="contained"
                            size="small"
                            style={{marginRight: "5px"}}
                            onClick={() => setShowConfirmDialog(true)}
                            disabled={blockButtons}
                        >
                            {reservation.isClose ? "Открыть бронирование" : "Отменить бронирование"}
                        </Button>
                    }
                    <Button variant="outlined" size="small" onClick={closeReservationForm}>Отмена</Button>
                </div>
            </Box>
            <ConfirmDialog
                showConfirmDialog={showConfirmDialog}
                setShowConfirmDialog={setShowConfirmDialog}
                callback={() => {deleteReservationHandler()}}
                dialogText={reservation.isClose ? "Вы действительно хотите открыть бронирование?" : "Вы действительно хотите удалить бронь?"}
            />
        </div>
    );
};

export default ReservationForm;