import useAxios from "./useAxios";

const ReservationService = (function(){
    const axios = useAxios()

    const transformReservationDates = (reservation) => {
        reservation.checkin = reservation.checkin.split('T')[0];
        reservation.checkout = reservation.checkout.split('T')[0];
    }

    const update = async (selectedRoom, updatedReservation) => {
        let response = await axios.put(
            `/rooms/${selectedRoom.id}/reservations/${updatedReservation.id}`,
            updatedReservation
        );
        let reservation = response.data;

        transformReservationDates(reservation);

        return reservation;
    }

    const del = async (selectedRoom, reservation) => {
        await axios.delete(`/rooms/${selectedRoom.id}/reservations/${reservation.id}`);
    }

    const create = async (selectedRoom, newReservation) => {
        let response = await axios.post(`/rooms/${selectedRoom.id}/reservations`, newReservation);
        let reservation = response.data;

        transformReservationDates(reservation);

        return reservation;
    }

    const list = async (page, limit, criteria) => {
        let params = {
            page: page,
            perPage: limit
        };

        let paramList = ['roomId', 'keyword', 'from', 'to'];
        paramList.forEach((paramName) => {
            if (criteria.hasOwnProperty(paramName)) {
                let val = criteria[paramName];
                if (paramName === 'from' || paramName === 'to') {
                    val = criteria[paramName].format("YYYY-MM-DD")
                }
                params[`criteria[${paramName}]`] = val;
            }
        })

        let response = await axios.get(
            `/reservations`,
            {params: params}
        );

        return response.data;
    }

    const download = async (criteria) => {
        let params = {
            perPage: -1
        };

        let paramList = ['roomId', 'keyword', 'from', 'to'];
        paramList.forEach((paramName) => {
            if (criteria.hasOwnProperty(paramName)) {
                let val = criteria[paramName];
                if (paramName === 'from' || paramName === 'to') {
                    val = criteria[paramName].format("YYYY-MM-DD")
                }
                params[`criteria[${paramName}]`] = val;
            }
        })

        return await axios.get(
            `/reservations/export`,
            {
                params: params,
                responseType: "arraybuffer"
            }
        );
    }

    const listByRoom = async (selectedRoom, criteria) => {
        let response = await axios.get(
            `/rooms/${selectedRoom.id}/reservations`,
            {params: {
                'criteria[from]': criteria.from,
                'criteria[to]': criteria.to,
            }}
        );
        let reservations = response.data.items;

        reservations.forEach(function(reservation, index) {
            this[index].checkin = reservation.checkin.split('T')[0];
            this[index].checkout = reservation.checkout.split('T')[0];
        }, reservations);

        return reservations;
    }

    return {
        download: download,
        list: list,
        listByRoom: listByRoom,
        create: create,
        update: update,
        delete: del
    }
})();

export default ReservationService;