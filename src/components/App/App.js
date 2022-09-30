import React, {useContext, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
    }
});

function App() {
    const { authState, logout } = useContext(AuthContext);

    const [showProgress, setShowProgress] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(false);
    const [roomList, setRoomList] = React.useState([]);

    const roomService = RoomService;

    const fetchRooms = async () => {
        setShowProgress(true);
        await roomService.list()
            .then((roomList) => {
                setRoomList(roomList);
            })
            .catch(() => {

            });
        setShowProgress(false);
    }

    React.useEffect(() => {
        if (authState.authenticated) {
            fetchRooms();
        }
    }, [authState])

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                { authState.authenticated &&
                    <React.Fragment>
                        <TopBar
                            roomList={roomList}
                            selectedRoom={selectedRoom}
                            setSelectedRoom={setSelectedRoom}
                        />
                        <Navbar logout={logout}/>
                    </React.Fragment>
                }
                { showProgress && <Progress /> }
                <Container fixed className="Container_main">
                    <AppRouter
                        setShowProgress={setShowProgress}
                        roomList={roomList}
                        setRoomList={setRoomList}
                        selectedRoom={selectedRoom}
                    />
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
