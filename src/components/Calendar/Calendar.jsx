import React, {useEffect, useState} from 'react';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import ReservationService from "../../api/ReservationService";
import {buildEvent} from "../../utils/EventBuilder";

import './Calendar.css'
import ReservationForm from "../Reservation/ReservationForm";
import ModalWindow from "../UI/Modal/ModalWindow";

const Calendar = () => {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState();

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
        let selectedEvent = calendarEvents.find((event) => {
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
            // Пустая форма для создания или закрытия бронирование
            openReservationForm()
        }
    }

    const handleEventClick = (e) => {
        const selectedReservation = reservations.find((element) => element.id === Number(e.event.id));
        openReservationForm(selectedReservation);
    }

    const deleteReservationHandler = (b) => {
        setCalendarEvents(calendarEvents.filter(e => e.id !== b.id))
    }

    const updateReservationHandler = (reservationFormData) => {

        const indexReservation = reservations.findIndex(b => b.id === reservationFormData.id)
        let updatedReservationItem = reservations[indexReservation];

        //console.log(reservationFormData);

        if (reservationFormData.name) {
            updatedReservationItem.contact.name = reservationFormData.name
            updatedReservationItem.contact.phone = reservationFormData.phone
        }
        updatedReservationItem.adults = reservationFormData.adults
        updatedReservationItem.children = reservationFormData.children
        updatedReservationItem.checkin = reservationFormData.checkin.toISOString().split('T')[0]
        updatedReservationItem.checkout = reservationFormData.checkout.toISOString().split('T')[0]
        updatedReservationItem.note = reservationFormData.note

        setReservations(
            reservations.map(function (reservationFormData) {
                if (reservationFormData.id === updatedReservationItem.id) {
                    return updatedReservationItem;
                }
                return reservationFormData;
            })
        )

        //console.log(updatedReservationItem);

        let updatedCalendarEvent = buildEvent(updatedReservationItem)

        setCalendarEvents(
            calendarEvents.map(function (event) {
                if (event.id === updatedCalendarEvent.id) {
                    return updatedCalendarEvent;
                }
                return event;
            })
        )
    }

    useEffect(() => {
        fetchReservations()
    }, [])

    async function fetchReservations() {
        const reservations = await ReservationService.getAll();
        let events = [];
        reservations.forEach((reservation) => {
            let event = buildEvent(reservation)
            events.push(event);
        })

        setReservations(reservations);
        setCalendarEvents(events);
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
                events={calendarEvents}
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