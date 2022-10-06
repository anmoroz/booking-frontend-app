import React from 'react';
import RoomItem from "./RoomItem";
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";

const RoomList = ({rooms, selectRoom}) => {

    if (!rooms.length) {
        return (
            <Typography align="center" variant="h5" component="h4">
                Объекты размещения не найдены
            </Typography>
        )
    }

    return (
        <div>
            <Typography variant="h5" component="h4">
                Объекты размещения
            </Typography>
            <List sx={{ width: '100%' }} key="roomList">
                {rooms.map((room, index) =>
                    <React.Fragment key={room.id}>
                        <RoomItem room={room} selectRoom={selectRoom} />
                        {
                            index + 1 !== rooms.length &&
                            <Divider variant="inset" component="li" />
                        }
                    </React.Fragment>
                )}
            </List>
        </div>
    );
};

export default RoomList;