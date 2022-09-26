import React, {useContext} from 'react';
import {BrowserRouter} from "react-router-dom";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppRouter from "./AppRouter";
import Navbar from "../UI/Navbar/Navbar";
import {AuthContext} from "../../context/AuthProvider";

import './App.css';

const theme = createTheme({
    palette: {
        primary: {
            main: "#009aaf"
        },
        secondary: {
            main: "#e29117"
        }
    }
});

function App() {
    const { authState, logout } = useContext(AuthContext);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                {authState.authenticated && <Navbar logout={logout}/>}
                <Container fixed className="Container_main">
                    <AppRouter/>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
