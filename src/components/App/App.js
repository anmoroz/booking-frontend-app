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
import {useFetching} from "../../hooks/useFetching";

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
    const [showRoomSelector, setShowRoomSelector] = React.useState(false);

    const roomService = RoomService;

    const openRoomSelector = () => {
        setShowRoomSelector(true);
    }

    const closeRoomSelector = () => {
        setShowRoomSelector(false)
    }

    const [fetchRooms, isRoomLoading, error] = useFetching(async (page, limit, filter) => {
        setShowProgress(true);
        await roomService.list()
            .then((roomList) => {
                setRoomList(roomList);
                if (roomList.length > 0 && !selectedRoom) {
                    setSelectedRoom(roomList[0]);
                }
            })
            .catch(() => {

            });
        setShowProgress(false);
    })

    /*const fetchRooms = async () => {
        setShowProgress(true);
        await roomService.list()
            .then((roomList) => {
                setRoomList(roomList);
                if (roomList.length > 0 && !selectedRoom) {
                    setSelectedRoom(roomList[0]);
                }
            })
            .catch(() => {

            });
        setShowProgress(false);
    }*/

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
                            openRoomSelector={openRoomSelector}
                            closeRoomSelector={closeRoomSelector}
                            showRoomSelector={showRoomSelector}
                        />
                        <Navbar logout={logout} roomList={roomList}/>
                    </React.Fragment>
                }
                { showProgress && <Progress /> }
                <Container fixed className="Container_main">
                    <AppRouter
                        setShowProgress={setShowProgress}
                        roomList={roomList}
                        setRoomList={setRoomList}
                        selectedRoom={selectedRoom}
                        openRoomSelector={openRoomSelector}
                        isRoomLoading={isRoomLoading}
                    />
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
