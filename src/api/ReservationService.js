import useAxios from "./useAxios";

const ReservationService = (function(){
    const axios = useAxios()

    const transformReservationDates = (reservation) => {
        reservation.checkin = reservation.checkin.split('T')[0];
        reservation.checkout = reservation.checkout.split('T')[0];
    }

    const update = async (updatedReservation) => {
        let response = await axios.put(`/rooms/1/reservations/${updatedReservation.id}`, updatedReservation);
        let reservation = response.data;

        transformReservationDates(reservation);

        return reservation;
    }

    const del = async (reservation) => {
        await axios.delete(`/rooms/1/reservations/${reservation.id}`);
    }

    const create = async (newReservation) => {
        let response = await axios.post('/rooms/1/reservations', newReservation);
        let reservation = response.data;

        transformReservationDates(reservation);

        return reservation;
    }

    const list = async (criteria) => {
        console.log(criteria)
        let response = await axios.get(
            '/rooms/1/reservations',
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
        list: list,
        create: create,
        update: update,
        delete: del
    }
})();

export default ReservationService;