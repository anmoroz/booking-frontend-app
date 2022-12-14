import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";
import WarningIcon from "@mui/icons-material/ErrorOutline";
import {formatPhone} from "../../utils/PhoneFormatter";

const ReservationTableItem = ({reservation}) => {
    const [open, setOpen] = React.useState(false);

    let backlight = dayjs(reservation.checkin).isSame(dayjs(), 'day')
        || dayjs(reservation.checkin).isSame(dayjs().add(1, 'day'), 'day')

    return (
        <React.Fragment>
            <TableRow
                style={{backgroundColor: backlight ? "#FFFFCC" : "#FFFFFF"}}
                sx={{ '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell>
                    {
                        reservation.note &&
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </IconButton>
                    }
                </TableCell>
                <TableCell align="left">{dayjs(reservation.checkin).format("DD.MM.YYYY")}</TableCell>
                <TableCell align="left">{dayjs(reservation.checkout).format("DD.MM.YYYY")}</TableCell>
                <TableCell align="left">{reservation.adults} / {reservation.children}</TableCell>
                <TableCell align="left">
                    {formatPhone(reservation.contact.phone)}
                    &nbsp; ({reservation.contact.name})
                    {
                        reservation.contact.isBanned &&
                        <Chip
                            component={'span'}
                            icon={<WarningIcon />}
                            label="??????????????"
                            color="error"
                            size="small"
                            sx={{ marginRight: '10px' }}
                        />
                    }
                </TableCell>
                <TableCell align="left">{reservation.room.name}</TableCell>
            </TableRow>
            {
                reservation.note &&
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    ????????????????????
                                </Typography>
                                <div className="view_note">
                                    {reservation.note}
                                </div>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            }
        </React.Fragment>
    );
};

export default ReservationTableItem;