import useAxios from "./useAxios";

const ContactService = (function() {
    const axios = useAxios();

    const update = async (contact) => {
        let response = await axios.put(`/contacts/${contact.id}`, contact);

        return response.data;
    }

    const create = async (contact) => {
        let response = await axios.post('/contacts', contact);

        return response.data;
    }

    const list = async () => {
        let response = await axios.get('/contacts');

        return response.data.items;
    }

    return {
        update:update,
        create: create,
        list: list
    }
})();

export default ContactService;