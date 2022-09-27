import React from 'react';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import ReservationService from "../../api/ReservationService";
import {buildEvent} from "../../utils/EventBuilder";
import ReservationForm from "../Reservation/ReservationForm";
import ModalWindow from "../UI/Modal/ModalWindow";
import dayjs from "dayjs";

import './Calendar.css'

const Calendar = ({setShowProgress}) => {
    let reservationService = ReservationService;
    const [events, setEvents] = React.useState([]);
    const [reservations, setReservations] = React.useState([]);
    const [showForm, setShowForm] = React.useState(false);
    const [selectedReservation, setSelectedReservation] = React.useState();

    const openReservationForm = (selectedReservation) => {
        setSelectedReservation(selectedReservation);
        setShowForm(true);
    }
    const closeReservationForm = () => {
        setSelectedReservation(undefined);
        setShowForm(false);
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

    const deleteReservationHandler = (b) => {
        setEvents(events.filter(e => e.id !== b.id))
    }

    const updateReservationHandler = (reservationFormData, successCallback, errorCallback) => {
        setShowProgress(true);

        let reservation = {
            id: undefined,
            adults: 0,
            children: 0,
            note: "",
            checkin: undefined,
            checkout: undefined,
            contact: null,
        }
        if (!reservationFormData.isNewReservation) {
            const indexReservation = reservations.findIndex(b => b.id === reservationFormData.id)
            reservation = reservations[indexReservation];
        }

        if (!reservationFormData.isClose) {
            if (reservationFormData.name) {
                reservation.contact.name = reservationFormData.name
                reservation.contact.phone = reservationFormData.phone
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
            createReservation(reservation)
                .then((createdReservation) => {
                    addReservation(createdReservation);
                    addEvent(buildEvent(createdReservation));
                    successCallback();
                })
                .catch((error) => {
                    errorCallback(error.response.data.message);
                });
        } else {
            let calendarEvent = buildEvent(reservation);
            setEvents(
                events.map(function (event) {
                    if (event.id === calendarEvent.id) {
                        return calendarEvent;
                    }
                    return event;
                })
            )
            successCallback();
        }
        setShowProgress(false);
    }

    const addReservation = React.useCallback((newReservation) => {
        setReservations(reservations => ([ ...reservations, newReservation ]))
    }, [])

    const addEvent = React.useCallback((newEvent) => {
        setEvents(events => ([ ...events, newEvent ]))
    }, [])

    React.useEffect(() => {
        fetchReservations()
    }, [])

    async function createReservation(newReservation) {
        return await reservationService.create(newReservation);
    }

    async function fetchReservations() {
        setShowProgress(true);
        const reservations = await reservationService.list();
        reservations.forEach((reservation) => {
            addReservation(reservation);
            addEvent(buildEvent(reservation));
        })
        setShowProgress(false);
    }

    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                weekends={true}
                locale="ru"
                firstDay={1}
                headerToolbar={{
                    start: 'title',
                    center: '',
                    end: 'prev,next'
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
                    updateReservationHandler={updateReservationHandler}
                    deleteReservationHandler={deleteReservationHandler}
                />}
            />
        </div>
    );
};

export default Calendar;