import React from 'react';
import Box from "@mui/material/Box";
import ReservationCardItem from "./ReservationCardItem";

const ReservationCardList = ({reservations}) => {
    return (
        <Box sx={{ flexGrow: 1 }} m={1} p={1}>
            { reservations.map((reservation) => (
                <ReservationCardItem key={`reservation-${reservation.id}`} reservation={reservation} />
            ))}
        </Box>
    );
};

export default ReservationCardList;