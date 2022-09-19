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

import './BookingForm.css';
import ConfirmDialog from "../UI/Dialog/ConfirmDialog";

const BookingForm = ({selectedBooking, closeBookingForm, updateBookingHandler, deleteBookingHandler}) => {
    const [isBookingClosed, setIsBookingClosed] = useState(
        selectedBooking === undefined || selectedBooking.user === null
    )

    const [showConfirmDialog, setShowConfirmDialog] = useState(false)

    const [bookingFormData, setBookingFormData] = useState({
        id: (selectedBooking !== undefined) ? selectedBooking.id : undefined,
        name: (selectedBooking !== undefined && selectedBooking.user) ? selectedBooking.user.name : '',
        phone: (selectedBooking !== undefined && selectedBooking.user) ? selectedBooking.user.phone : '',
        numberOfGuests: (selectedBooking !== undefined) ? selectedBooking.numberOfGuests : 0,
        note: (selectedBooking !== undefined) ? selectedBooking.note : "",
        startDate: (selectedBooking !== undefined) ? new Date(selectedBooking.startDate) : new Date(),
        days: (selectedBooking !== undefined) ? selectedBooking.days : 1,
    });

    const saveBookingFormHandler = (event) => {
        event.preventDefault();
        //console.log(JSON.stringify(bookingFormData))
        updateBookingHandler(bookingFormData)
        closeBookingForm()
    }

    const deleteBooking = () => {
        deleteBookingHandler(selectedBooking)
        closeBookingForm()
    }

    return (
        <div>
            <Typography id="modal-modal-title" variant="h5" component="h3" m={1} p={1}>
                {isBookingClosed ? <span>Бронирование закрыто</span> : <span>Бронирование</span>}
            </Typography>
            {
                !isBookingClosed &&
                <div>
                    <Box m={1} p={1}>
                        <TextField
                            fullWidth id="name"
                            label="Имя"
                            variant="outlined"
                            size="small"
                            value={bookingFormData.name}
                            onChange={e => setBookingFormData({...bookingFormData, name: e.target.value})}
                        />
                    </Box>
                    <Box m={1} p={1}>
                        <TextField
                            fullWidth
                            id="phone"
                            label="Телефон"
                            variant="outlined"
                            size="small"
                            value={bookingFormData.phone}
                            onChange={e => setBookingFormData({...bookingFormData, phone: e.target.value})}
                        />
                    </Box>
                </div>
            }
            <Box m={1} p={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru" >
                    <DesktopDatePicker
                        label="Дата"
                        inputFormat="DD.MM.YYYY"
                        value={bookingFormData.startDate}
                        onChange={newStartDate => {
                            setBookingFormData(
                                {...bookingFormData, startDate: new Date(newStartDate.format("YYYY-MM-DD"))}
                            )
                        }}
                        renderInput={(params) => <TextField size="small" {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                    id="days"
                    label="Количество дней"
                    variant="outlined"
                    size="small"
                    value={bookingFormData.days}
                    onChange={e => setBookingFormData({...bookingFormData, days: e.target.value})}
                    type="number"
                    style={{ marginLeft: "5px" }}
                />
            </Box>
            {
                !isBookingClosed &&
                <Box m={1} p={1}>
                    <TextField
                        fullWidth
                        id="numberOfGuests"
                        select
                        label="Количество гостей"
                        variant="outlined"
                        size="small"
                        defaultValue={bookingFormData.numberOfGuests}
                        onChange={e => setBookingFormData({...bookingFormData, numberOfGuests: e.target.value})}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                    </TextField>
                </Box>
            }
            <Box m={1} p={1}>
                <TextField
                    id="note"
                    type="text"
                    rows={2}
                    multiline
                    style={{ width: '100%' }}
                    label="Примечание"
                    value={bookingFormData.note}
                    onChange={e => setBookingFormData({...bookingFormData, note: e.target.value})}
                />
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
                    onClick={saveBookingFormHandler}
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
                        {isBookingClosed ? "Открыть бронирование" : "Отменить бронирование"}
                    </Button>
                    <Button variant="outlined" size="small" onClick={closeBookingForm}>Отмена</Button>
                </div>
            </Box>
            <ConfirmDialog
                showConfirmDialog={showConfirmDialog}
                setShowConfirmDialog={setShowConfirmDialog}
                callback={() => {deleteBooking()}}
                dialogText={isBookingClosed ? "Вы действительно хотите открыть бронирование?" : "Вы действительно хотите удалить бронь?"}
            />
        </div>
    );
};

export default BookingForm;