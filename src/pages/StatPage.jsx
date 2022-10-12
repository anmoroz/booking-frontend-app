import React from 'react';
import StatService from "../api/StatService";
import {useFetching} from "../hooks/useFetching";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import CircularProgress from "@mui/material/CircularProgress";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const statService = StatService;

const StatPage = (props) => {
    const [chartData, setChartData] = React.useState([]);

    const [fetchStat, isLoading, error] = useFetching(async (room) => {
        const response = await statService.reservations(room);

        response.items.forEach((item) => {
            addChartData({
                label: item.month,
                value: item.days,
                toolText: `${item.amount} ₽`
            })
        })
    })

    const addChartData = React.useCallback((data) => {
        setChartData(chartData => ([ ...chartData, data ]))
    }, [])

    React.useEffect(() => {
        if (props.selectedRoom) {
            fetchStat(props.selectedRoom);
        }
    }, [props.isRoomLoading])

    const chartConfigs = {
        type: "column2d",
        width: "100%",
        height: "400",
        dataFormat: "json",
        dataSource: {
            chart: {
                outCnvBaseFont: "Roboto",
                caption: "Количество забронированных дней за год",
                subCaption: "",
                xAxisName: "",
                yAxisName: "Забронированно дней",
                numberSuffix: "",
                theme: "fusion"
            },
            data: chartData
        }
    };

    return (
        <div>
            <Typography variant="h5" component="h4">
                Статистика за год
            </Typography>
            <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                {
                    isLoading
                        ? <Box  m={1} p={1} display="flex" justifyContent="center"><CircularProgress /></Box>
                        : <ReactFC {...chartConfigs} />
                }
            </Box>
        </div>
    );
};

export default StatPage;