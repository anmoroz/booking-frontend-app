import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import DialogContent from "@mui/material/DialogContent";


const RoomSelectorForm = ({roomList, selectedRoom, onChangeRoomSelector}) => {

    return (
        <DialogContent sx={{minWidth: "500px"}}>
            <Autocomplete
                fullWidth
                getOptionLabel={(room) => room.name}
                isOptionEqualToValue={(room, selectedRoom) => room.id === selectedRoom.id}
                id="room-selector"
                value={selectedRoom}
                options={roomList}
                onChange={onChangeRoomSelector}
                renderInput={(params) => <TextField
                    {...params}
                    fullWidth
                    label="Объект размещения"
                />}
                PopperComponent={({ style, ...props }) => (
                    <Popper
                        {...props}
                        style={{ ...style, height: 0 }} // width is passed in 'style' prop
                    />
                )}
            />
        </DialogContent>
    );
};

export default RoomSelectorForm;