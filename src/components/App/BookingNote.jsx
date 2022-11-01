import React, {useContext, useState} from 'react';
import TopBar from "../UI/TopBar/TopBar";
import Navbar from "../UI/Navbar/Navbar";
import Progress from "../UI/Progress/Progress";
import Container from "@mui/material/Container";
import AppRouter from "./AppRouter";
import {AuthContext} from "../../context/AuthProvider";
import RoomService from "../../api/RoomService";
import {useFetching} from "../../hooks/useFetching";
import {BrowserRouter} from "react-router-dom";

const BookingNote = () => {
    const { authState, logout } = useContext(AuthContext);
    const [showProgress, setShowProgress] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(false);
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

    /*const { status, data, error, isFetching } = roomService.useRooms();

    if (!isFetching) {
        setRoomList(data.items);
        if (data.items.length > 0 && !selectedRoom) {
            setSelectedRoom(data.items[0]);
        }
    }*/

    const [fetchRooms, isRoomLoading, error2] = useFetching(async (page, limit, filter) => {
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

    React.useEffect(() => {
        if (authState.authenticated) {
            fetchRooms();
        }
    }, [authState])

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
    );
};

export default BookingNote;