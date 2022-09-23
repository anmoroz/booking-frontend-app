import axios from "axios";

export default class ReservationService {
    static async getAll() {
        const response = await axios.get('http://localhost:3000/reservations.json')

        return response.data;
    }
}