import React from 'react';
import {
    createTheme,
    ThemeProvider
} from '@mui/material/styles';
import { AppContextProvider } from '../../context/AppContext'
import BookingNote from "./BookingNote";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import './App.css';

const queryClient = new QueryClient();

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
    return (
        <ThemeProvider theme={theme}>
            <AppContextProvider>
                <QueryClientProvider client={queryClient}>
                    <BookingNote />
                </QueryClientProvider>
            </AppContextProvider>
        </ThemeProvider>
    );
}

export default App;
