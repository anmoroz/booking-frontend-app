import React from 'react';
import RoomList from "../components/Room/RoomList";
import RoomService from "../api/RoomService";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ModalWindow from "../components/UI/Modal/ModalWindow";
import RoomForm from "../components/Room/RoomForm";

const RoomPage = (props) => {
    const [showForm, setShowForm] = React.useState(false);
    const [editedRoom, setEditedRoom] = React.useState(null);

    const roomService = RoomService;

    const selectRoom = (room) => {
        setEditedRoom(room);
        setShowForm(true);
    }

    const saveRoom = async (room, successCallback, errorCallback) => {
        props.setShowProgress(true);
        if (!room.hasOwnProperty('id')) {
            await roomService.create(room)
                .then((createdRoom) => {
                    setEditedRoom(null);
                    addRoom(createdRoom);
                    successCallback();
                })
                .catch((error) => {
                    errorCallback(error.response.data.message);
                })
                .finally(() => { props.setShowProgress(false) });
        } else {
            await roomService.update(room)
                .then((updatedRoom) => {
                    setEditedRoom(null);
                    props.setRoomList(
                        props.roomList.map(function (roomItem) {
                            if (roomItem.id === updatedRoom.id) {
                                return updatedRoom;
                            }
                            return roomItem;
                        })
                    );
                    successCallback();
                })
                .catch((error) => {
                    errorCallback(error.response.data.message);
                })
                .finally(() => { props.setShowProgress(false) });
        }
    }

    const addRoom = React.useCallback((newRoom) => {
        props.setRoomList(rooms => ([ ...rooms, newRoom ]))
    }, [])

    const closeForm = () => {
        setShowForm(false);
    }

    return (
        <div>
            {
                !props.roomList.length
                ? <Typography align="center" variant="h6" component="h5">
                    Загрузка объектов размещения
                </Typography>
                : <div>
                    <RoomList rooms={props.roomList} selectRoom={selectRoom} />
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setEditedRoom({name: '', address: ''});
                            setShowForm(true);
                        }}
                    >
                        Создать
                    </Button>
                    <ModalWindow
                        open={showForm}
                        handleClose={closeForm}
                        content={<RoomForm
                            editedRoom={editedRoom}
                            save={saveRoom}
                            closeForm={closeForm}
                        />}
                    />
                </div>
            }
        </div>
    );
};

export default RoomPage;