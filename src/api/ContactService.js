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

    const list = async (page, limit, filter) => {
        let response = await axios.get(
            '/contacts',
            {
                params: {
                    page: page,
                    perPage: limit,
                    'criteria[keyword]': filter.query
                }
            }
        );

        return response.data;
    }

    return {
        update:update,
        create: create,
        list: list
    }
})();

export default ContactService;