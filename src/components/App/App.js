import React, {useContext, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppContextProvider } from '../../context/AppContext'
import AppRouter from "./AppRouter";
import Navbar from "../UI/Navbar/Navbar";
import {AuthContext} from "../../context/AuthProvider";
import Progress from "../UI/Progress/Progress";
import TopBar from "../UI/TopBar/TopBar";
import RoomService from "../../api/RoomService";

import './App.css';


const theme = createTheme({
    palette: {
        primary: {
            main: "#009aaf"
        },
        secondary: {
            main: "#e29117"
        }
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
    },
});

function App() {
    const { authState, logout } = useContext(AuthContext);
    const [showProgress, setShowProgress] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(undefined);
    const [roomList, setRoomList] = React.useState([]);
    const [showRoomSelector, setShowRoomSelector] = React.useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const roomService = RoomService;

    const openRoomSelector = () => {
        setShowRoomSelector(true);
    }

    const closeRoomSelector = () => {
        setShowRoomSelector(false)
    }

    const { status, data, error, isFetching } = roomService.useRooms();

    React.useMemo(() => {
        if (data) {
            setRoomList(data.items);
            if (roomList.length > 0 && !selectedRoom) {
                setSelectedRoom(roomList[0]);
            }
        }
    }, [data])


    React.useEffect(() => {
        setShowProgress(isFetching)
    }, [isFetching])

    React.useEffect(() => {
        const handleStatusChange = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);

        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, [isOnline]);


    return (
        <ThemeProvider theme={theme}>
            <AppContextProvider>
                <BrowserRouter>
                    { authState.authenticated &&
                        <React.Fragment>
                            <TopBar
                                roomList={roomList}
                                selectedRoom={selectedRoom}
                                setSelectedRoom={setSelectedRoom}
                                openRoomSelector={openRoomSelector}
                                closeRoomSelector={closeRoomSelector}
                                showRoomSelector={showRoomSelector}
                                isOnline={isOnline}
                            />
                            <Navbar logout={logout} roomList={roomList}/>
                        </React.Fragment>
                    }
                    { showProgress && <Progress /> }
                    <AppRouter
                        setShowProgress={setShowProgress}
                        roomList={roomList}
                        setRoomList={setRoomList}
                        selectedRoom={selectedRoom}
                        openRoomSelector={openRoomSelector}
                        isRoomLoading={isFetching}
                    />
                </BrowserRouter>
            </AppContextProvider>
        </ThemeProvider>
    );
}

export default App;
