import React from 'react';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import HelpContent from "../Help/HelpContent";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BottomButtons = ({openSignUpForm}) => {
    const [openHelp, setOpenHelp] = React.useState(false);

    const handleClickOpenHelp = () => {
        setOpenHelp(true);
    };

    const handleCloseHelp = () => {
        setOpenHelp(false);
    };

    return (
        <Container>
            <Button
                onClick={openSignUpForm}
                variant="contained"
                color="primary"
                sx={{ marginBottom: "20px", width: '200px', fontSize: '16px' }}
            >
                Регистрация
            </Button>
            <Button
                onClick={handleClickOpenHelp}
                sx={{ marginBottom: "20px", paddingLeft: "20px", fontSize: '14px' }}
            >
                Подробнее о приложении
            </Button>
            <Dialog
                fullScreen
                open={openHelp}
                onClose={handleCloseHelp}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseHelp}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            О приложении
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container>
                    <HelpContent />
                    <Button
                        onClick={handleCloseHelp}
                        sx={{ paddingBottom: "30px", fontSize: '14px' }}
                    >
                        Закрыть
                    </Button>

                </Container>
            </Dialog>
        </Container>
    );
};

export default BottomButtons;