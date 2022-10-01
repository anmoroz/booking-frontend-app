import React from 'react';
import Typography from "@mui/material/Typography";
import ContactList from "../components/Contact/ContactList";
import ContactService from "../api/ContactService";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ContactForm from "../components/Contact/ContactForm";
import ModalWindow from "../components/UI/Modal/ModalWindow";
import SearchPanel from "../components/Contact/SearchPanel";
import {useFetching} from "../hooks/useFetching";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const ContactPages = (props) => {
    const [contactList, setContactList] = React.useState([]);
    const [showForm, setShowForm] = React.useState(false);
    const [editedContact, setEditedContact] = React.useState(null);
    const [filter, setFilter] = React.useState({sort: '', query: ''});
    const [totalPages, setTotalPages] = React.useState(0);
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);

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

    React.useEffect(() => {
        fetchContactList(page, limit, filter);
    }, [page, limit, filter])

    const [fetchContactList, contactError] = useFetching(async (page, limit, filter) => {
        props.setShowProgress(true);
        const response = await contactService.list(page, limit, filter);
        setContactList(response.items);
        const totalCount = response.meta.totalCount;
        setTotalPages(Math.ceil(totalCount / limit));
        props.setShowProgress(false);
    })

    const handleChangePage = (e, page) => {
        setPage(page);
    };

    /*if (!contactList.length) {
        return <Typography align="center" variant="h6" component="h5">
            Загрузка списка контактов
        </Typography>
    }*/

    return (
        <div>
            <Typography variant="h5" component="h4">
                Ваши контакты
            </Typography>
            <SearchPanel filter={filter} setFilter={setFilter} />
            <ContactList contactList={contactList} selectContactHandler={selectContactHandler} />

            <Stack spacing={2} alignItems="center">
                <Pagination count={totalPages} page={page} color="primary" onChange={handleChangePage} />
            </Stack>

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