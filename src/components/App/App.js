import React, {useContext, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppRouter from "./AppRouter";
import Navbar from "../UI/Navbar/Navbar";
import {AuthContext} from "../../context/AuthProvider";

import './App.css';
import Progress from "../UI/Progress/Progress";

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
    const [showProgress, setShowProgress] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                { authState.authenticated && <Navbar logout={logout}/> }
                { showProgress && <Progress /> }
                <Container fixed className="Container_main">
                    <AppRouter setShowProgress={setShowProgress} />
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
