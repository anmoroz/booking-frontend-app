import axios from "axios";

export default class BookingService {
    static async getAll() {
        const response = await axios.get('http://localhost:3000/bookingList.json')

        return response.data;
    }
}