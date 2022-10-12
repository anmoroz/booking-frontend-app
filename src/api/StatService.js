import useAxios from "./useAxios";

const StatService = (function() {
    const axios = useAxios();

    const reservations = async (room) => {
        let response = await axios.get(`/stat/room/${room.id}/reservations`);

        return response.data;
    }

    return {
        reservations: reservations
    }
})();

export default StatService;