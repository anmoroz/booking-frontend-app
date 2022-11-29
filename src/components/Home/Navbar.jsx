import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";
import Login from "../Login/Login";
import ModalWindow from "../UI/Modal/ModalWindow";
import {AppContext} from "../../context/AppContext";
import Container from '@mui/material/Container';

const Navbar = (props) => {
    const { media } = React.useContext(AppContext);
    const [showLogin, setShowLogin] = React.useState(false);

    const openLoginForm = () => {
        setShowLogin(true);
    }

    const closeLoginForm = () => {
        setShowLogin(false);
    }

    function ElevationScroll(props) {
        const { children, window } = props;
        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: 0,
            target: window ? window() : undefined,
        });

        return React.cloneElement(children, {
            elevation: trigger ? 4 : 0,
        });
    }

    ElevationScroll.propTypes = {
        children: PropTypes.element.isRequired,
        window: PropTypes.func,
    };

    return (
        <>
            <ElevationScroll {...props}>
                <AppBar sx={{boxShadow: 3, bgcolor: "white"}}>
                    <Container>
                        <Toolbar>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                                <img src="/logo192.png" alt="Logo" style={{width:"64px", height:'64px'}} />
                                {
                                    media !== 'mobile' &&
                                    <Typography variant="h3" component="h3" sx={{marginTop: "6px", color: "#333333"}}>
                                        Booking Note
                                    </Typography>
                                }
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    sx={{marginRight: "10px"}}
                                    onClick={props.openSignUpForm}
                                >
                                    Регистрация
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={openLoginForm}
                                >
                                    Вход
                                </Button>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <ModalWindow
                open={showLogin}
                handleClose={closeLoginForm}
                content={<Login/>}
            />
        </>
    );
};

export default Navbar;