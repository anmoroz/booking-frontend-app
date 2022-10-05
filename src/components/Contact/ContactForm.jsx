import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import ErrorAlert from "../UI/Alert/ErrorAlert";
import Typography from "@mui/material/Typography";
import InputMask from "react-input-mask";

const ContactForm = ({editedContact, save, closeForm}) => {
    const [errorMessage, setErrorMessage] = React.useState(false);
    const [blockButtons, setBlockButtons] = React.useState(false);
    const [contact, setContact] = React.useState(editedContact);

    const saveContact = (e) => {
        e.preventDefault();
        setBlockButtons(true);
        save(
            contact,
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
            <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                <Typography variant="h6" component="h5">
                    {contact.hasOwnProperty("id") ? "Редактирование" : "Новый контакт"}
                </Typography>
            </Box>
            <ErrorAlert errorMessage={errorMessage} />
            <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputMask
                            mask="+9 (999) 999-99-99"
                            disabled={false}
                            maskChar=" "
                            value={contact.phone}
                            onChange={e => setContact({...contact, phone: e.target.value})}
                        >
                            {() => <TextField
                                fullWidth
                                label="Телефон"
                                variant="outlined"
                                size="small"
                            />}
                        </InputMask>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Имя"
                            variant="outlined"
                            size="small"
                            value={contact.name}
                            onChange={e => setContact({...contact, name: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            rows={2}
                            multiline
                            style={{ width: '100%' }}
                            label="Примечание"
                            value={contact.note}
                            onChange={e => setContact({...contact, note: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        color="error"
                                        checked={contact.isBanned}
                                        onChange={
                                            (e) => {
                                                setContact({...contact, isBanned: e.target.checked});
                                            }
                                        }
                                    />
                                }
                                label="Забанен"
                            />
                        </FormGroup>
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
                    onClick={saveContact}
                    disabled={blockButtons}
                >
                    Сохранить
                </Button>
                <Button variant="outlined" size="small" onClick={closeForm}>Отмена</Button>
            </Box>
        </div>
    );
};

export default ContactForm;