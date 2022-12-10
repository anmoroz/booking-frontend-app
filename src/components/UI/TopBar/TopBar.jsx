import React from 'react';
import { AppContext } from '../../../context/AppContext'
import Box from "@mui/material/Box";
import ModalWindow from "../Modal/ModalWindow";
import RoomSelectorForm from "./RoomSelectorForm";
import HouseIcon from '@mui/icons-material/House';
import WarningIcon from '@mui/icons-material/WarningAmber';
import SignalWifiConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiConnectedNoInternet4';

import "./TopBar.css";

const TopBar = (props) => {
    const { media } = React.useContext(AppContext)

    const onChangeRoomSelector = (event, room) => {
        if (room) {
            props.setSelectedRoom(room);
        }
        props.closeRoomSelector();
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
                onClick={props.openRoomSelector}
            >
                <Box
                    className="TopBar_main_wrapper"
                    component="span"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    {
                        props.selectedRoom
                        ? <div>
                                <HouseIcon className="TopBar_icon" />
                                {props.selectedRoom.name}
                          </div>
                        : <div>
                                <WarningIcon className="TopBar_icon TopBar_icon_warning" />
                                Выберете объект размещения
                          </div>
                    }
                    {
                        !props.isOnline &&
                        <div className="TopBar_no_connection">
                            {
                                media === 'mobile'
                                ? <SignalWifiConnectedNoInternet4Icon />
                                : "Нет подключения к серверу"
                            }
                        </div>
                    }
                </Box>
            </Box>
            <ModalWindow
                open={props.showRoomSelector}
                handleClose={props.closeRoomSelector}
                content={<RoomSelectorForm
                    roomList={props.roomList}
                    selectedRoom={props.selectedRoom}
                    onChangeRoomSelector={onChangeRoomSelector}
                />}
            />
        </React.Fragment>
    );
};

export default TopBar;