import React, {useEffect, useState} from 'react';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import BookingService from "../../API/BookingService";
import {buildEvent} from "../../utils/EventBuilder";

import './Calendar.css'
import BookingForm from "../Booking/BookingForm";
import ModalWindow from "../UI/Modal/ModalWindow";

const Calendar = () => {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [bookingList, setBookingList] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [selectedBooking, setSelectedBooking] = useState();

    const openBookingForm = (selectedBooking) => {
        setSelectedBooking(selectedBooking);
        setShowForm(true);
    }
    const closeBookingForm = () => {
        setSelectedBooking(undefined);
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
            openBookingForm(bookingList.find((element) => element.id === selectedEvent.id))
        } else {
            // Пустая форма для создания или закрытия бронирование
            openBookingForm()
        }
    }

    const handleEventClick = (e) => {
        const selectedBooking = bookingList.find((element) => element.id === Number(e.event.id));
        openBookingForm(selectedBooking);
    }

    const deleteBookingHandler = (b) => {
        setCalendarEvents(calendarEvents.filter(e => e.id !== b.id))
    }

    const updateBookingHandler = (bookingFormData) => {

        const indexBooking = bookingList.findIndex(b => b.id === bookingFormData.id)
        let updatedBookingItem = bookingList[indexBooking];

        if (bookingFormData.name) {
            updatedBookingItem.user.name = bookingFormData.name
            updatedBookingItem.user.phone = bookingFormData.phone
        }
        updatedBookingItem.numberOfGuests = bookingFormData.numberOfGuests
        updatedBookingItem.startDate = bookingFormData.startDate.toISOString().split('T')[0]
        updatedBookingItem.days = bookingFormData.days
        updatedBookingItem.note = bookingFormData.note

        setBookingList(
            bookingList.map(function (bookingFormData) {
                if (bookingFormData.id === updatedBookingItem.id) {
                    return updatedBookingItem;
                }
                return bookingFormData;
            })
        )

        let updatedCalendarEvent = buildEvent(updatedBookingItem)

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
        fetchBookingList()
    }, [])

    async function fetchBookingList() {
        const bookingList = await BookingService.getAll();
        let events = [];
        bookingList.forEach((bookingItem) => {
            let event = buildEvent(bookingItem)
            events.push(event);
        })

        setBookingList(bookingList);
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
                handleClose={closeBookingForm}
                content={<BookingForm
                    selectedBooking={selectedBooking}
                    closeBookingForm={closeBookingForm}
                    updateBookingHandler={updateBookingHandler}
                    deleteBookingHandler={deleteBookingHandler}
                />}
            />
        </div>
    );
};

export default Calendar;