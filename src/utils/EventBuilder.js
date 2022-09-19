import dayjs from "dayjs";

export const buildEvent = (bookingItem) => {
    let user = bookingItem.user;
    let title = user !== null ? user.name : "";
    if (bookingItem.numberOfGuests > 0) {
        title = `${title} (${bookingItem.numberOfGuests})`
    }


    return {
        id: bookingItem.id,
        title: title,
        start: bookingItem.startDate,
        end: dayjs(bookingItem.startDate).add(bookingItem.days, 'day').format('YYYY-MM-DD'),
        backgroundColor: user !== null ? '#66CC00' : '#CCC',
        borderColor: user !== null ? '#66CC00' : '#CCC',
    }
}