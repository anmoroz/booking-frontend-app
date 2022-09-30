import React from 'react';
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ContactItem from "./ContactItem";
import Divider from "@mui/material/Divider";

const ContactList = ({contactList, selectContactHandler}) => {

    return (
        <div>
            <Typography variant="h5" component="h4">
                Ваши контакты
            </Typography>
            <List sx={{ width: '100%' }} key="roomList">
                {contactList.map((contact, index) =>
                    <React.Fragment key={contact.id}>
                        <ContactItem contact={contact} selectContactHandler={selectContactHandler} />
                        {
                            index + 1 !== contactList.length &&
                            <Divider variant="inset" component="li" />
                        }
                    </React.Fragment>
                )}
            </List>
        </div>
    );
};

export default ContactList;