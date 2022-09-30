import React from 'react';
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';
import WarningIcon from '@mui/icons-material/ErrorOutline';

const ContactItem = ({contact, selectContactHandler}) => {
    return (
        <ListItem
            alignItems="flex-start"
            secondaryAction={
                <IconButton
                    aria-label="Редактировать"
                    onClick={() => {selectContactHandler(contact)}}
                >
                    <EditIcon />
                </IconButton>
            }
        >
            <ListItemText
                primary={contact.phone}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {
                                contact.isBanned &&
                                <Chip
                                    component={'span'}
                                    icon={<WarningIcon />}
                                    label="Забанен"
                                    color="error"
                                    size="small"
                                    sx={{ marginRight: '10px' }}
                                />
                            }
                            {contact.name}

                        </Typography>
                        &nbsp; {contact.note}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
};

export default ContactItem;