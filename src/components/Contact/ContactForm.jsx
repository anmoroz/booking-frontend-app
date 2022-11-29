import React from 'react';
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import ErrorAlert from "../UI/Alert/ErrorAlert";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

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

    const onChangePhone = (e) => {
        let phone = e.target.value;

        if (phone.match(/^[1-6,8,9,0]$/)) {
            phone = `+7 ${phone}`;
        } else if (phone.match(/^7$/)) {
            phone = `+${phone} `;
        } else if (phone.match(/^\+7$/)) {
            phone = `${phone} `;
        }
        setContact({...contact, phone: phone});
    }

    return (
        <>
            <DialogContent dividers>
                <ErrorAlert errorMessage={errorMessage} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Телефон"
                            variant="outlined"
                            size="small"
                            value={contact.phone}
                            onChange={onChangePhone}
                        />
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
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between", margin: "8px" }}>
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
            </DialogActions>
        </>
    );
};

export default ContactForm;