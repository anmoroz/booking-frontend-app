import React from 'react';
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

const RoomForm = ({editedRoom, save, closeForm}) => {
    const [errorMessage, setErrorMessage] = React.useState(false);
    const [blockButtons, setBlockButtons] = React.useState(false);
    const [room, setRoom] = React.useState(editedRoom);

    const saveRoom = (e) => {
        e.preventDefault();
        setBlockButtons(true);
        save(
            room,
            () => {
                closeForm();
                setErrorMessage(false);
                setBlockButtons(false);
            },
            (message) => {
                setErrorMessage(message);
                setBlockButtons(false);
            }
        );
    }

    return (
        <div>
            {
                errorMessage &&
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="filled" severity="error" style={{whiteSpace: "pre-wrap"}}>
                        {errorMessage}
                    </Alert>
                </Stack>
            }
            <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Название"
                            variant="outlined"
                            size="small"
                            value={room.name}
                            onChange={e => setRoom({...room, name: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Адрес"
                            variant="outlined"
                            size="small"
                            value={room.address}
                            onChange={e => setRoom({...room, address: e.target.value})}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box
                component="span"
                m={1}
                p={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    onClick={saveRoom}
                    disabled={blockButtons}
                >
                    Сохранить
                </Button>
                <Button variant="outlined" size="small" onClick={closeForm}>Отмена</Button>
            </Box>
        </div>
    );
};

export default RoomForm;