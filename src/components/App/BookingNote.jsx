import React, {useContext, useState} from 'react';
import TopBar from "../UI/TopBar/TopBar";
import Navbar from "../UI/Navbar/Navbar";
import Progress from "../UI/Progress/Progress";
import Container from "@mui/material/Container";
import AppRouter from "./AppRouter";
import {AuthContext} from "../../context/AuthProvider";
import RoomService from "../../api/RoomService";
import {BrowserRouter} from "react-router-dom";

const EMPTY_LIST = []

const BookingNote = () => {
    const { authState, logout } = useContext(AuthContext);
    const [showProgress, setShowProgress] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState();
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
        <BrowserRouter>
            { authState.authenticated &&
                <React.Fragment>
                    <TopBar
                        roomList={data?.items ?? EMPTY_LIST}
                        selectedRoom={selectedRoom ?? data?.items[0]}
                        setSelectedRoom={setSelectedRoom}
                        openRoomSelector={openRoomSelector}
                        closeRoomSelector={closeRoomSelector}
                        showRoomSelector={showRoomSelector}
                        isOnline={isOnline}
                    />
                    <Navbar logout={logout} roomList={data?.items ?? EMPTY_LIST}/>
                </React.Fragment>
            }
            { showProgress && <Progress /> }
            <Container fixed className="Container_main">
                <AppRouter
                    setShowProgress={setShowProgress}
                    roomList={data?.items ?? EMPTY_LIST}
                    setRoomList={setRoomList}
                    selectedRoom={selectedRoom ?? data?.items[0]}
                    openRoomSelector={openRoomSelector}
                    isRoomLoading={isFetching}
                />
            </Container>
        </BrowserRouter>
    );
};

export default BookingNote;