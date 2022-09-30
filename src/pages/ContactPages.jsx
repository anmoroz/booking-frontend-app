import React from 'react';
import Typography from "@mui/material/Typography";
import ContactList from "../components/Contact/ContactList";
import ContactService from "../api/ContactService";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ContactForm from "../components/Contact/ContactForm";
import ModalWindow from "../components/UI/Modal/ModalWindow";

const ContactPages = (props) => {
    const [contactList, setContactList] = React.useState([]);
    const [showForm, setShowForm] = React.useState(false);
    const [editedContact, setEditedContact] = React.useState(null);

    const contactService = ContactService;

    const selectContactHandler = (contact) => {
        setEditedContact(contact);
        setShowForm(true);
    }

    const saveContact = async (contact, successCallback, errorCallback) => {
        props.setShowProgress(true);
        if (!contact.hasOwnProperty('id')) {
            await contactService.create(contact)
                .then((createdContact) => {
                    setEditedContact(null);
                    addContact(createdContact);
                    successCallback();
                })
                .catch((error) => {
                    errorCallback(error.response.data.message);
                })
                .finally(() => { props.setShowProgress(false) });
        } else {
            await contactService.update(contact)
                .then((updatedContact) => {
                    setEditedContact(null);
                    setContactList(
                        contactList.map(function (contactItem) {
                            if (contactItem.id === updatedContact.id) {
                                return updatedContact;
                            }
                            return contactItem;
                        })
                    );
                    successCallback();
                })
                .catch((error) => {
                    errorCallback(error.response.data.message);
                })
                .finally(() => { props.setShowProgress(false) });
        }
    }

    const addContact = React.useCallback((newContact) => {
        setContactList(contacts => ([ ...contacts, newContact ]))
    }, [])

    const closeForm = () => {
        setShowForm(false);
    }

    const fetchContactList = async () => {
        props.setShowProgress(true);
        await contactService.list()
            .then((contactList) => {
                setContactList(contactList);
            })
            .catch(() => {

            });
        props.setShowProgress(false);
    }

    React.useEffect(() => {
        fetchContactList();
    }, [])


    if (!contactList.length) {
        return <Typography align="center" variant="h6" component="h5">
            Загрузка списка контактов
        </Typography>
    }

    return (
        <div>
            <ContactList contactList={contactList} selectContactHandler={selectContactHandler} />
            <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => {
                    setEditedContact({phone: '', name: '', note: '', isBanned: false});
                    setShowForm(true);
                }}
            >
                Создать
            </Button>
            <ModalWindow
                open={showForm}
                handleClose={closeForm}
                content={<ContactForm
                    editedContact={editedContact}
                    save={saveContact}
                    closeForm={closeForm}
                />}
            />
        </div>
    );
};

export default ContactPages;