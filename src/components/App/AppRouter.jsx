import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import CalendarPage from "../../pages/CalendarPage";
import RoomPage from "../../pages/RoomPage";
import ReservationPage from "../../pages/ReservationPage";
import ContactPages from "../../pages/ContactPages";
import StatPage from "../../pages/StatPage";
import HelpPage from "../../pages/HelpPage";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';


const AppRouter = (props) => {

    if (props.isRoomLoading) {
        return (
            <Box m={1} p={1} display="flex" justifyContent="center"><CircularProgress /></Box>
        );
    }

    let defaultRoute = props.selectedRoom ? '/calendar' : '/room';

    return (
        <Container className="Container_main">
            <Routes>
                <Route path="/room" element={ <RoomPage {...props} /> } />
                <Route path="/contact" element={ <ContactPages {...props} /> } />
                <Route path="/reservation" element={ <ReservationPage {...props} /> } />
                <Route path="/calendar" element={ <CalendarPage {...props} /> } />
                <Route path="/stat" element={ <StatPage {...props} /> } />
                <Route path="/help" element={ <HelpPage {...props} /> } />
                <Route path="*" element={<Navigate to={defaultRoute} replace />}/>
            </Routes>
        </Container>
    );
};

export default AppRouter;