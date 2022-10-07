import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import dayjs from "dayjs";
import {formatPhone} from "../../utils/PhoneFormatter";
import Chip from "@mui/material/Chip";
import WarningIcon from "@mui/icons-material/ErrorOutline";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CallIcon from '@mui/icons-material/Call';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import Divider from "@mui/material/Divider";
import {formatPrice} from "../../utils/PriceFormatter";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const ReservationCardItem = ({reservation}) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let backlight = dayjs(reservation.checkin).isSame(dayjs(), 'day')
        || dayjs(reservation.checkin).isSame(dayjs().add(1, 'day'), 'day')

    return (
        <Card
            style={{backgroundColor: backlight ? "#FFFFCC" : "#EBFEFF"}}
            sx={{ minWidth: 275, marginTop: '16px' }}
        >
            <CardContent sx={{paddingTop: '10px', paddingBottom: '6px'}} >
                <Typography sx={{ fontSize: 16 }} component="div">
                    {formatPhone(reservation.contact.phone)} &nbsp; ({reservation.contact.name})
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Прибытие: <strong>{dayjs(reservation.checkin).format("DD.MM.YYYY")}</strong>
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Выезд: <strong>{dayjs(reservation.checkout).format("DD.MM.YYYY")}</strong>
                </Typography>
                {
                    reservation.price &&
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        Цена: <strong>{formatPrice(reservation.price)}</strong>
                    </Typography>
                }
            </CardContent>
            <Divider />
            <CardActions disableSpacing>
                <Tooltip title="Позвонить">
                    <IconButton aria-label="Позвонить" href={`tel:+${reservation.contact.phone}`}>
                        <CallIcon />
                    </IconButton>
                </Tooltip>
                {
                    reservation.contact.isBanned &&
                    <Chip
                        component={'span'}
                        icon={<WarningIcon />}
                        label="Забанен"
                        color="error"
                        size="small"
                        sx={{ marginRight: '10px' }}
                    />
                }
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Гостей: {reservation.adults} / {reservation.children}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {reservation.room.name}
                    </Typography>
                    {
                        reservation.note &&
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Примечание: <div className="view_note">{reservation.note}</div>
                        </Typography>
                    }
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default ReservationCardItem;