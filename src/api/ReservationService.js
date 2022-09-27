import useAxios from "./useAxios";

const ReservationService = (function(){
    const axios = useAxios()

    const list = async () => {
        try {
            let response = await axios.get('/rooms/1/reservations');
            let reservations = response.data.items;

            reservations.forEach(function(reservation, index) {
                this[index].checkin = reservation.checkin.split('T')[0];
                this[index].checkout = reservation.checkout.split('T')[0];
            }, reservations);

            return reservations;
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