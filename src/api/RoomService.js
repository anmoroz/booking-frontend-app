import useAxios from "./useAxios";

const RoomService = (function() {
    const axios = useAxios();

    const update = async (room) => {
        let response = await axios.put(`/rooms/${room.id}`, room);

        return response.data;
    }

    const create = async (room) => {
        let response = await axios.post('/rooms', room);

        return response.data;
    }

    const list = async () => {
        let response = await axios.get('/rooms');

        return response.data.items;
    }

    return {
        update:update,
        create: create,
        list: list
    }
})();

export default RoomService;