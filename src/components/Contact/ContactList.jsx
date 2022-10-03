import React from 'react';
import List from "@mui/material/List";
import ContactItem from "./ContactItem";
import Divider from "@mui/material/Divider";
import ContactView from "./ContactView";
import ModalWindow from "../UI/Modal/ModalWindow";

const ContactList = ({contactList, selectContactHandler}) => {
    const [openView, setOpenView] = React.useState(false);
    const [selectedContact, setSelectedContact] = React.useState(null);

    const contactViewHandler = (contact) => {
        setSelectedContact(contact);
        setOpenView(true);
    }

    const closeView = () => {
        setOpenView(false);
    }

    return (
        <div>
            <List sx={{ width: '100%' }} key="roomList">
                {contactList.map((contact, index) =>
                    <React.Fragment key={contact.id}>
                        <ContactItem
                            contact={contact}
                            selectContactHandler={selectContactHandler}
                            contactViewHandler={contactViewHandler}
                        />
                        {
                            index + 1 !== contactList.length &&
                            <Divider variant="inset" component="li" />
                        }
                    </React.Fragment>
                )}
            </List>
            <ModalWindow
                open={openView}
                handleClose={closeView}
                content={<ContactView contact={selectedContact} />}
            />
        </div>
    );
};

export default ContactList;