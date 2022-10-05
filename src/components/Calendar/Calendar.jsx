import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import ReservationService from "../../api/ReservationService";
import {buildEvent} from "../../utils/EventBuilder";
import ReservationForm from "../Reservation/ReservationForm";
import ModalWindow from "../UI/Modal/ModalWindow";
import Alert from '@mui/material/Alert';
import dayjs from "dayjs";

import './Calendar.css'

const Calendar = (props) => {
    const reservationService = ReservationService;
    const calendarRef = React.useRef();
    const [events, setEvents] = React.useState([]);
    const [reservations, setReservations] = React.useState([]);
    const [showForm, setShowForm] = React.useState(false);
    const [selectedReservation, setSelectedReservation] = React.useState();
    const [criteria, setCriteria] = React.useState({
        from: dayjs().startOf('month').add(-6, 'day').format("YYYY-MM-DD"),
        to: dayjs().startOf('month').add(37, 'day').format("YYYY-MM-DD"),
    });

    const openReservationForm = (selectedReservation) => {
        if (!props.selectedRoom) {
            props.openRoomSelector();
            return;
        }
        setSelectedReservation(selectedReservation);
        setShowForm(true);
    }

    const closeReservationForm = () => {
        setSelectedReservation(undefined);
        setShowForm(false);
    }

    const handlePrevMonthClick = () => {
        if (!props.selectedRoom) {
            props.openRoomSelector();
            return;
        }
        let calendarApi = calendarRef.current.getApi();
        calendarApi.prev();
        updateCriteria(calendarApi);
    }

    const handleNextMonthClick = () => {
        if (!props.selectedRoom) {
            props.openRoomSelector();
            return;
        }
        let calendarApi = calendarRef.current.getApi();
        calendarApi.next();
        updateCriteria(calendarApi);
    }

    const updateCriteria = (calendarApi) => {
        let calendarDate = calendarApi.getDate();
        setCriteria({
            from: dayjs(calendarDate).add(6, 'day').format("YYYY-MM-DD"),
            to: dayjs(calendarDate).add(37, 'day').format("YYYY-MM-DD"),
        });
    }

    const handleDateClick = (arg) => {
        let clickedDate = new Date(arg.date);
        let selectedEvent = events.find((event) => {
            let eventStartDate = new Date(event.start),
                eventEndDate = new Date(event.end);

            eventStartDate.setHours(0,0,0,0);
            eventEndDate.setHours(0,0,0,0);
            eventEndDate.setDate(eventEndDate.getDate() - 1);

            return eventStartDate <= clickedDate && eventEndDate >= clickedDate;
        })

        if (selectedEvent) {
            openReservationForm(reservations.find((element) => element.id === selectedEvent.id))
        } else {
            // Пустая форма для создания/закрытия бронирования
            openReservationForm({
                checkin: dayjs(clickedDate).format("YYYY-MM-DD"),
                checkout: dayjs(clickedDate).add(1, 'day').format("YYYY-MM-DD") ,
                isNewReservation: true
            })
        }
    }

    const handleEventClick = (e) => {
        const selectedReservation = reservations.find((element) => element.id === Number(e.event.id));
        openReservationForm(selectedReservation);
    }

    const deleteReservation = (reservation, successCallback, errorCallback) => {
        sendDeleteReservation(reservation)
            .then(() => {
                setEvents(events.filter(e => e.id !== reservation.id));
                successCallback();
            })
            .catch((error) => {
                errorCallback(error.response.data.message);
            })
            .finally(() => { props.setShowProgress(false) });
    }

    const saveReservation = (reservationFormData, successCallback, errorCallback) => {
        props.setShowProgress(true);
        let reservation = {
            id: undefined,
            adults: 0,
            children: 0,
            note: "",
            checkin: undefined,
            checkout: undefined,
            contact: undefined,
        }
        if (!reservationFormData.isNewReservation) {
            const indexReservation = reservations.findIndex(b => b.id === reservationFormData.id)
            reservation = reservations[indexReservation];
        }

        if (!reservationFormData.isClose) {
            reservation.contact = {
                name: reservationFormData.name,
                phone: reservationFormData.phone.replace(/\D/g,'')
            }
            reservation.adults = reservationFormData.adults
            reservation.children = reservationFormData.children
        }

        reservation.checkin = reservationFormData.checkin.toISOString().split('T')[0]
        reservation.checkout = reservationFormData.checkout.toISOString().split('T')[0]
        reservation.note = reservationFormData.note

        setReservations(
            reservations.map(function (reservationItem) {
                if (reservationItem.id === reservation.id) {
                    return reservation;
                }
                return reservationItem;
            })
        )

        if (reservationFormData.isNewReservation) {
            sendCreateReservation(reservation)
                .then((createdReservation) => {
                    addReservation(createdReservation);
                    addEvent(buildEvent(createdReservation));
                    successCallback();
                })
                .catch((error) => {
                    errorCallback(error.response.data.message);
                })
                .finally(() => { props.setShowProgress(false) });
        } else {
            sendUpdateReservation(reservation)
                .then((updatedReservation) => {
                    let calendarEvent = buildEvent(updatedReservation);
                    setEvents(
                        events.map(function (event) {
                            if (event.id === calendarEvent.id) {
                                return calendarEvent;
                            }
                            return event;
                        })
                    )
                    successCallback();
                })
                .catch((error) => {
                    errorCallback(error.response.data.message);
                })
                .finally(() => { props.setShowProgress(false) });
        }
    }

    const addReservation = React.useCallback((newReservation) => {
        setReservations(reservations => ([ ...reservations, newReservation ]))
    }, [])

    const addEvent = React.useCallback((newEvent) => {
        setEvents(events => ([ ...events, newEvent ]))
    }, [])

    React.useEffect(() => {
        fetchReservations();
    }, [criteria, props.selectedRoom])
    
    async function sendDeleteReservation(reservation) {
        return await reservationService.delete(props.selectedRoom, reservation);
    }
    
    async function sendCreateReservation(newReservation) {
        return await reservationService.create(props.selectedRoom, newReservation);
    }

    async function sendUpdateReservation(updatedReservation) {
        return await reservationService.update(props.selectedRoom, updatedReservation);
    }

    async function fetchReservations() {
        props.setShowProgress(true);
        setEvents([]);
        setReservations([]);
        if (props.selectedRoom) {
            const reservations = await reservationService.listByRoom(props.selectedRoom, criteria);
            reservations.forEach((reservation) => {
                addReservation(reservation);
                addEvent(buildEvent(reservation));
            })
        }
        props.setShowProgress(false);
    }

    return (
        <div>
            {
                !props.selectedRoom &&
                <Alert variant="outlined" severity="warning" style={{marginBottom: '16px'}}>
                    Не выбран объект размещения!
                </Alert>
            }
            <FullCalendar
                ref={calendarRef}
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                weekends={true}
                locale="ru"
                firstDay={1}
                customButtons={{
                    customPrev: {
                        icon: 'chevron-left',
                        click: () => {handlePrevMonthClick()}
                    },
                    customNext: {
                        icon: 'chevron-right',
                        click: () => {handleNextMonthClick()}
                    }
                }}
                headerToolbar={{
                    start: 'title',
                    center: '',
                    end: 'customPrev,customNext'
                }}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventColor="#66CC00"
                eventBackgroundColor="#66CC00"
                nextDayThreshold='12:00:00'
                events={events}
            />
            <ModalWindow
                open={showForm}
                handleClose={closeReservationForm}
                content={<ReservationForm
                    selectedReservation={selectedReservation}
                    closeReservationForm={closeReservationForm}
                    saveReservation={saveReservation}
                    deleteReservation={deleteReservation}
                />}
            />
        </div>
    );
};

export default Calendar;