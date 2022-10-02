import React from 'react';
import Box from "@mui/material/Box";
import ModalWindow from "../Modal/ModalWindow";
import RoomSelectorForm from "./RoomSelectorForm";
import HouseIcon from '@mui/icons-material/House';
import WarningIcon from '@mui/icons-material/WarningAmber';

import "./TopBar.css";

const TopBar = ({roomList, selectedRoom, setSelectedRoom}) => {
    const [showRoomSelector, setShowRoomSelector] = React.useState(false);

    const openRoomSelector = () => {
        setShowRoomSelector(true);
    }

    const closeRoomSelector = () => {
        setShowRoomSelector(false)
    }

    const onChangeRoomSelector = (event, option) => {
        if (option) {
            setSelectedRoom(option.room);
        }
        closeRoomSelector();
    }

    return (
        <React.Fragment>
            <Box className="TopBar_main"
                sx={{
                    flexGrow: 1,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    }
                }}
                onClick={openRoomSelector}
            >
                <div className="TopBar_main_wrapper">
                    {
                        selectedRoom
                        ? <div>
                                <HouseIcon className="TopBar_icon" />
                                {selectedRoom.name}
                          </div>
                        : <div>
                                <WarningIcon className="TopBar_icon TopBar_icon_warning" />
                                Выберете объект размещения
                          </div>
                    }
                </div>

            </Box>
            <ModalWindow
                open={showRoomSelector}
                handleClose={closeRoomSelector}
                hideCloseButton={true}
                content={<RoomSelectorForm
                    roomList={roomList}
                    selectedRoom={selectedRoom}
                    onChangeRoomSelector={onChangeRoomSelector}
                />}
            />
        </React.Fragment>
    );
};

export default TopBar;