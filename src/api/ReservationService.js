import React from 'react';
import useAxios from "./useAxios";

const ReservationService = (function(){
    const axios = useAxios()

    const list = async () => {
        try {
            let response = await axios.get('/rooms/1/reservations');
            return response.data.items;
        } catch (err) {
            console.log(err);
        }

        return [];
    }

    return {
        list: list
    }
})();

export default ReservationService;