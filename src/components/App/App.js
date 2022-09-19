import React, {useState} from 'react';

import './App.css';
import {BrowserRouter} from "react-router-dom";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {AuthContext} from '../../context';
import AppRouter from "./AppRouter";
import Navbar from "../UI/Navbar/Navbar";

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
    const [isAuth, setIsAuth] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth
            }}>
                <BrowserRouter>
                    <Navbar/>
                    <Container fixed className="Container_main">
                        <AppRouter/>
                    </Container>
                </BrowserRouter>
            </AuthContext.Provider>
        </ThemeProvider>
    );
}

export default App;
