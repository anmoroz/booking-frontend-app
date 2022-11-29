import React from 'react';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const HelpContent = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                <Paper elevation={2}>
                    <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                        <Typography variant="h6" component="h6">
                            Объекты размещения
                        </Typography>
                        <p>
                            Объекты размещения - это любой объект, предназначенный для временного проживания гостя: отель, апартаменты, квартира и т.д.
                        </p>
                        <p>Для начала работы с ситемой нужно создать хотя бы один объект размещения.</p>
                        <p align="center">
                            <img src="/help/help-rooms1.jpg" alt="Создание объекта размещения" width="90%"/>
                        </p>
                    </Box>
                </Paper>
                <Paper elevation={2} style={{marginTop: '26px'}}>
                    <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                        <Typography variant="h6" component="h6">
                            Контакты
                        </Typography>
                        <p>
                            Контакт содержит телефон, имя (ФИО), примечание и флаг "Забанен" (да/нет).
                        </p>
                        <p>
                            Вы можете создавать контакт на странице "Контакты" без привязки к бронированию.
                            Контакт будет создан автоматически при создании бронировании в календаре.
                            Если при создании бронирования указать телефон уже существующего контакта, то бронирование будет привязано к существующему контакту.
                        </p>
                        <p>
                            Есть возможность сразу позвонить на номер, если выше устройство это поддерживает.
                        </p>
                        <p align="center">
                            <img src="/help/help-contacts1.jpg" alt="Список контактов" width="90%"/>
                        </p>
                    </Box>
                </Paper>
                <Paper elevation={2} style={{marginTop: '26px'}}>
                    <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                        <Typography variant="h6" component="h6">
                            Бронирования
                        </Typography>
                        <p>
                            На странице список всех бронирований. По умолчанию показаны бронирования на ближайшую неделю.
                            Здесь можно только найти и посмотреть детали брони, создание броирования на странице "Календарь".
                        </p>
                        <p align="center">
                            <img src="/help/help-reservations1.jpg" alt="Список бронирований" width="90%"/>
                        </p>
                        <p>
                            Изменение текущего объекта бронирования.
                        </p>
                        <p align="center">
                            <img src="/help/help-reservations2.jpg" alt="Изменение текущего объекта размещения" width="90%"/>
                        </p>
                    </Box>
                </Paper>
                <Paper elevation={2} style={{marginTop: '26px'}}>
                    <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                        <Typography variant="h6" component="h6">
                            Календарь
                        </Typography>
                        <p>
                            По умолчанию календарь выводится для текущего месяца. Для просмотра календаря для другого объекта размещения нужно нажать на топбар и далеть выбор - календатрь обновится.
                        </p>
                        <p>
                            При нажатии на день откроется диалог создания или редактирования бронирования. Также можно закрыть бронирование на один или несколько дней.
                        </p>
                        <p align="center">
                            <img src="/help/help-calendar1.jpg" alt="Календарь" width="90%"/>
                        </p>
                        <p align="center">
                            <img src="/help/help-calendar2.jpg" alt="Редактирование бронирования" width="90%"/>
                        </p>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default HelpContent;