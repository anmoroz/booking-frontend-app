import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const RoomItem = ({room, selectRoom}) => {

    return (
        <ListItem
            alignItems="flex-start"
            secondaryAction={
                <IconButton
                    aria-label="Редактировать"
                    onClick={() => {selectRoom(room)}}
                >
                    <EditIcon />
                </IconButton>
            }
        >
            <ListItemText
                primary={room.name}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {room.address}
                        </Typography>
                        {""}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
};

export default RoomItem;