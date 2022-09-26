import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthProvider";

import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../Login/Login";
import CalendarPage from "../../pages/CalendarPage";

const AppRouter = () => {
    const { authState } = useContext(AuthContext);

    return (
        authState.authenticated
            ? <Routes>
                    <Route path="/calendar" element={ <CalendarPage/> } />
                    <Route
                        path="*"
                        element={<Navigate to="/calendar" replace />}
                    />
                </Routes>
            : <Login/>
    );
};

export default AppRouter;