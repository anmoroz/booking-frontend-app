import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReservationItem from "./ReservationItem";
import Box from "@mui/material/Box";

const ReservationList = ({reservations}) => {
    return (
        <Box sx={{ flexGrow: 1 }} m={1} p={1}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Прибытие</TableCell>
                            <TableCell>Выезд</TableCell>
                            <TableCell>Гостей</TableCell>
                            <TableCell>Контакт</TableCell>
                            <TableCell>Объект</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.map((reservation) => (
                            <ReservationItem  key={`reservation-${reservation.id}`} reservation={reservation} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ReservationList;