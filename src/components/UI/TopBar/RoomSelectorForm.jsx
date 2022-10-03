import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const RoomSelectorForm = ({roomList, selectedRoom, onChangeRoomSelector}) => {

    let options = [];
    roomList.forEach((room) => {
        options.push({label: room.name, room: room});
    })

    return (
        <div>
            <Autocomplete
                disablePortal
                fullWidth
                id="room-selector"
                value={selectedRoom ? selectedRoom.name : undefined}
                options={options}
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