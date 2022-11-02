import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const EMPTY_LIST = []

const RoomSelectorForm = ({roomList, selectedRoom, onChangeRoomSelector}) => {

    return (
        <div>
            <Autocomplete
                disablePortal
                fullWidth
                getOptionLabel={(room) => room.name}
                isOptionEqualToValue={(room, selectedRoom) => room.id === selectedRoom.id}
                id="room-selector"
                value={selectedRoom}
                options={roomList ?? EMPTY_LIST}
                onChange={onChangeRoomSelector}
                renderInput={(params) => <TextField
                    {...params}
                    fullWidth
                    label="Объект размещения"
                />}
            />
        </div>
    );
};

export default RoomSelectorForm;