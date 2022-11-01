import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from "react-router-dom";


const Navbar = ({logout, roomList}) => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    let pages = [
        {title: 'Объекты размещения', url: 'room'},
        {title: 'Контакты', url: 'contact'},
        {title: 'Бронирования', url: 'reservation'},
        {title: 'Календарь', url: 'calendar'},
        {title: 'Статистика', url: 'stat'}
    ];
    if (roomList.length === 0) {
        pages = [
            {title: 'Объекты размещения', url: 'room'},
            {title: 'Контакты', url: 'contact'}
        ];
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.url}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        navigate(page.url);
                                    }}
                                >
                                    <Typography textAlign="center">{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                                <Button
                                    key={page.url}
                                    color="inherit"
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        navigate(page.url);
                                    }}
                                    sx={{ my: 2, display: 'block' }}
                                >
                                    {page.title}
                                </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Button key="help" color="inherit" onClick={() => {navigate("help")}}>
                            <HelpOutlineIcon />
                        </Button>
                        <Button key="logout" color="inherit" onClick={logout}>
                            <LogoutIcon />
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;