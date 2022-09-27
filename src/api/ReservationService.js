import useAxios from "./useAxios";

const ReservationService = (function(){
    const axios = useAxios()

    const create = async (newReservation) => {
        let response = await axios.post('/rooms/1/reservations', newReservation);
        let reservation = response.data;

        reservation.checkin = reservation.checkin.split('T')[0];
        reservation.checkout = reservation.checkout.split('T')[0];

        return reservation;
    }

    const list = async () => {
        let response = await axios.get('/rooms/1/reservations');
        let reservations = response.data.items;

        reservations.forEach(function(reservation, index) {
            this[index].checkin = reservation.checkin.split('T')[0];
            this[index].checkout = reservation.checkout.split('T')[0];
        }, reservations);

        return reservations;
    }

    return {
        list: list,
        create: create
    }
})();

export default ReservationService;