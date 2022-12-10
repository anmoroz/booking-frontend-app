import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';
import WarningIcon from '@mui/icons-material/ErrorOutline';
import {formatPhone} from "../../utils/PhoneFormatter";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
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

const ContactItem = ({contact, selectContactHandler}) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ minWidth: 275, marginTop: '16px', backgroundColor: '#EBFEFF' }}>
            <CardContent sx={{paddingTop: '10px', paddingBottom: '6px'}}>
                <Typography sx={{ fontSize: 16 }} component="div" gutterBottom>
                    {formatPhone(contact.phone)} &nbsp; ({contact.name})
                </Typography>
            </CardContent>
            <Divider />
            <CardActions disableSpacing sx={{padding: '6px'}}>
                <Tooltip title="Позвонить">
                    <IconButton aria-label="Позвонить" href={`tel:+${contact.phone}`}>
                        <CallIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Открыть в WhatsApp">
                    <IconButton
                        aria-label="Открыть в WhatsApp"
                        href={`whatsapp://send?phone=${contact.phone}`}
                    >
                        <WhatsAppIcon />
                    </IconButton>
                </Tooltip>
                <IconButton
                    aria-label="Редактировать"
                    onClick={() => {selectContactHandler(contact)}}
                >
                    <EditIcon />
                </IconButton>
                {
                    contact.isBanned &&
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
                        Создан: {dayjs(contact.createdAt).format("DD.MM.YYYY")}
                    </Typography>
                    {
                        contact.note &&
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Примечание: <div className="view_note">{contact.note}</div>
                        </Typography>
                    }
                    {
                        contact.lastReservation &&
                        <Grid container spacing={1} sx={{ fontSize: 14 }}>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h6">Последняя бронь</Typography>
                            </Grid>
                            <Grid item xs={3} display="flex" justifyContent="flex-end">
                                Объект:
                            </Grid>
                            <Grid item xs={9}>
                                {contact.lastReservation.room.name}
                            </Grid>
                            <Grid item xs={3} display="flex" justifyContent="flex-end">
                                Прибытие:
                            </Grid>
                            <Grid item xs={9}>
                                {dayjs(contact.lastReservation.checkin).format("DD.MM.YYYY")}
                            </Grid>
                            <Grid item xs={3} display="flex" justifyContent="flex-end">
                                Выезд:
                            </Grid>
                            <Grid item xs={9}>
                                {dayjs(contact.lastReservation.checkout).format("DD.MM.YYYY")}
                            </Grid>
                            <Grid item xs={3} display="flex" justifyContent="flex-end">
                                Взрослые:
                            </Grid>
                            <Grid item xs={9}>
                                {contact.lastReservation.adults}
                            </Grid>
                            <Grid item xs={3} display="flex" justifyContent="flex-end">
                                Дети:
                            </Grid>
                            <Grid item xs={9}>
                                {contact.lastReservation.children}
                            </Grid>
                            {
                                contact.lastReservation.price &&
                                <React.Fragment>
                                    <Grid item xs={3} display="flex" justifyContent="flex-end">
                                        Цена:
                                    </Grid>
                                    <Grid item xs={9}>
                                        {formatPrice(contact.lastReservation.price)}
                                    </Grid>
                                </React.Fragment>
                            }
                            <Grid item xs={3}></Grid>
                            <Grid item xs={9} className="view_note">
                                {contact.lastReservation.note}
                            </Grid>
                        </Grid>
                    }
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default ContactItem;