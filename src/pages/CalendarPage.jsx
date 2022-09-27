import React from 'react';
import Calendar from "../components/Calendar/Calendar";

const CalendarPage = ({setShowProgress}) => {
    return (
        <Calendar setShowProgress={setShowProgress} />
    );
};

export default CalendarPage;