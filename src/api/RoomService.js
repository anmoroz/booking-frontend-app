import useAxios from "./useAxios";
import {useQuery} from "@tanstack/react-query";

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

    function useRooms() {
        return useQuery(["rooms"], async () => {
            const { data } = await axios.get("/rooms");

            return data;
        });
    }

    return {
        useRooms: useRooms,
        update:update,
        create: create,
        list: list
    }
})();

export default RoomService;