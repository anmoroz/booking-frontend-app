import React from 'react';
import Container from '@mui/material/Container';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PhoneForwardedOutlinedIcon from '@mui/icons-material/PhoneForwardedOutlined';
import AddHomeWorkOutlinedIcon from '@mui/icons-material/AddHomeWorkOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";


const FeaturesBlocks = () => {

    const sectionItems = [
        {
            id: 1,
            icon: <ManageSearchIcon sx={{ fontSize: 80 }} color="primary" />,
            sentence:
                'Ведение базы контактов с возможностью поиска',
        },
        {
            id: 2,
            icon: <PhoneForwardedOutlinedIcon sx={{ fontSize: 80 }} color="primary" />,
            sentence:
                'Быстрый звонок если позволяет устройство',
        },
        {
            id: 3,
            icon: <AddHomeWorkOutlinedIcon sx={{ fontSize: 80 }} color="primary" />,
            sentence: 'Ведение нескольких объектов размещения',
        },
        {
            id: 4,
            icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 80 }} color="primary" />,
            sentence: 'Учет бронирований в удобном календаре',
        },
        {
            id: 5,
            icon: <TableChartOutlinedIcon sx={{ fontSize: 80 }} color="primary" />,
            sentence: 'Экспорт списка бронироней в XLSX',
        },
        {
            id: 6,
            icon: <QueryStatsOutlinedIcon sx={{ fontSize: 80 }} color="primary" />,
            sentence: 'Просмотр статистики помесячно по каждому объекту',
        },
    ];

    return (
        <Container>
            <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
                <Grid container className="Home_sectionGridContainer">
                    {sectionItems.map((item) => (
                        <Grid
                            item
                            xs={12}
                            md={3.5}
                            key={item.id}
                            className="Home_sectionGridItem"
                        >
                            {item.icon}
                            <Typography>{item.sentence}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default FeaturesBlocks;