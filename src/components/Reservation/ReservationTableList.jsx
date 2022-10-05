import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReservationTableItem from "./ReservationTableItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';

const ReservationTableList = ({reservations, isLoading}) => {

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
                        {
                            isLoading &&
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        }
                        {
                            !isLoading && reservations.length === 0
                            ? <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="h6" component="h6">Нет данных</Typography>
                                </TableCell>
                            </TableRow>
                            : reservations.map((reservation) => (
                                <ReservationTableItem key={`reservation-${reservation.id}`} reservation={reservation} />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ReservationTableList;