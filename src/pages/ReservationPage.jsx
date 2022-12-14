import React from 'react';
import ReservationService from "../api/ReservationService";
import {useFetching} from "../hooks/useFetching";
import ReservationCardList from "../components/Reservation/ReservationCardList";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchPanel from "../components/Contact/SearchPanel";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Tooltip from '@mui/material/Tooltip';
import fileSaver from 'file-saver';


const ReservationPage = (props) => {
    let defaultFilter = {
        sort: '',
        keyword: '',
        roomId: null,
        from: null,
        to: null
    }
    const reservationService = ReservationService;
    const [reservations, setReservations] = React.useState([]);
    const [filter, setFilter] = React.useState(defaultFilter);
    const [totalPages, setTotalPages] = React.useState(0);
    const [limit, setLimit] = React.useState(50);
    const [page, setPage] = React.useState(1);

    const [fetchReservationList, isLoading, error] = useFetching(async (page, limit, filter) => {
        if (!filter.roomId) {
            return;
        }
        setReservations([]);
        let response = await reservationService.list(page, limit, filter);
        setReservations(response.items);
        const totalCount = response.meta.totalCount;
        setTotalPages(Math.ceil(totalCount / limit));
    })

    const handleChangePage = (e, page) => {
        setPage(page);
    };

    const handleExport = async () => {
        await reservationService.download(filter)
            .then((response) => {
                let blob = new Blob([response.data], {
                    type: response.headers['content-type']
                });
                fileSaver.saveAs(blob, 'reservations-export.xlsx')
            });
    };

    React.useEffect(() => {
        if (props.selectedRoom) {
            setFilter({...filter, roomId: props.selectedRoom.id})
        }
    }, [props.selectedRoom])

    React.useEffect(() => {
        fetchReservationList(page, limit, filter);
    }, [page, limit, filter])

    return (
        <div>
            <Typography variant="h5" component="h4">
                ????????????????????????
            </Typography>
            <SearchPanel filter={filter} setFilter={setFilter} placeholder="?????????? ???? ???????????????? ?? ??????????" />
            <Box
                component="span"
                m={1}
                p={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru" >
                        <DesktopDatePicker
                            label="????"
                            value={filter.from}
                            inputFormat="DD.MM.YYYY"
                            onChange={date => {
                                setFilter(
                                    {...filter, from: date}
                                )
                            }}
                            renderInput={(params) => <TextField style={{marginTop: '6px', marginRight: '10px', width: '145px'}} size="small" {...params} />}
                        />
                        <DesktopDatePicker
                            label="????"
                            value={filter.to}
                            inputFormat="DD.MM.YYYY"
                            onChange={date => {
                                setFilter(
                                    {...filter, to: date}
                                )
                            }}
                            renderInput={(params) => <TextField size="small" style={{marginTop: '6px', width: '145px'}} {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <Tooltip title="?????????????? ?? XLSX">
                    <IconButton onClick={handleExport}>
                        <FileDownloadIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            {
                isLoading
                    ? <Box display="flex" justifyContent="center"><CircularProgress /></Box>
                    : <React.Fragment>
                        {
                            !isLoading && reservations.length === 0
                                ? <Box display="flex" justifyContent="center" m={1} p={1}>
                                    <Typography variant="h5" component="h5">?????? ????????????</Typography>
                                </Box>
                                :
                                <ReservationCardList reservations={reservations} isLoading={isLoading} />
                        }
                    </React.Fragment>
            }
            {
                totalPages > 1 &&
                <Stack spacing={2} alignItems="center" style={{ marginTop: '10px' }}>
                    <Pagination count={totalPages} page={page} color="primary" onChange={handleChangePage} />
                </Stack>
            }
        </div>
    );
};

export default ReservationPage;