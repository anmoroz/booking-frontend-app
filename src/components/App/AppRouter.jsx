import React, {useContext} from 'react';
import {AuthContext} from "../../context";
import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import CalendarPage from "../../pages/CalendarPage";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);

    return (
        isAuth
            ?
            <Routes>
                <Route path="/calendar" element={ <CalendarPage/> } />
                <Route
                    path="*"
                    element={<Navigate to="/calendar" replace />}
                />
            </Routes>
            :
            <Routes>
                <Route path="/login" element={ <LoginPage/> } />
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
    );
};

export default AppRouter;