import React from 'react';
import ContactItem from "./ContactItem";
import Box from "@mui/material/Box";

const ContactList = ({contactList, selectContactHandler}) => {
    return (
        <Box sx={{ flexGrow: 1 }} m={1} p={1}>
            {contactList.map((contact) =>
                <React.Fragment key={contact.id}>
                    <ContactItem
                        contact={contact}
                        selectContactHandler={selectContactHandler}
                    />
                </React.Fragment>
            )}
        </Box>
    );
};

export default ContactList;