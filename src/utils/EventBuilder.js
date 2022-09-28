
export const buildEvent = (reservationItem) => {
    let contact = reservationItem.contact;
    let title = "";

    if (contact !== null) {
        title = `${contact.name} (взр. ${reservationItem.adults}, д. ${reservationItem.children})`
    }

    return {
        id: reservationItem.id,
        title: title,
        start: reservationItem.checkin,
        end: reservationItem.checkout,
        backgroundColor: contact !== null ? '#66CC00' : '#CCC',
        borderColor: contact !== null ? '#66CC00' : '#CCC',
    }
}