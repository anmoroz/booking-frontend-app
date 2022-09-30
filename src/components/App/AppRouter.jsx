import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthProvider";

import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../Login/Login";
import CalendarPage from "../../pages/CalendarPage";
import RoomPage from "../../pages/RoomPage";
import ReservationPage from "../../pages/ReservationPage";

const AppRouter = (props) => {
    const { authState } = useContext(AuthContext);

    return (
        authState.authenticated
            ? <Routes>
                    <Route path="/calendar" element={ <CalendarPage {...props} /> } />
                    <Route path="/room" element={ <RoomPage {...props} /> } />
                    <Route path="/reservation" element={ <ReservationPage {...props} /> } />
                    <Route
                        path="*"
                        element={<Navigate to="/calendar" replace />}
                    />
                </Routes>
            : <Login/>
    );
};

export default AppRouter;