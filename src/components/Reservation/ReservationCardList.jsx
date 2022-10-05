import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReservationCardItem from "./ReservationCardItem";

const ReservationCardList = ({reservations, isLoading}) => {
    return (
        <Box sx={{ flexGrow: 1 }} m={1} p={1}>
            {
                !isLoading && reservations.length === 0
                    ? <Box>
                        <Typography variant="h6" component="h6">Нет данных</Typography>
                    </Box>
                    : reservations.map((reservation) => (
                        <ReservationCardItem key={`reservation-${reservation.id}`} reservation={reservation} />
                    ))
            }
        </Box>
    );
};

export default ReservationCardList;