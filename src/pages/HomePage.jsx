import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Home/Navbar';
import Hero from "../components/Home/Hero";
import FeaturesBlocks from "../components/Home/FeaturesBlocks";
import PhoneInstall from "../components/Home/PhoneInstall";
import Advantages from "../components/Home/Advantages";
import BottomButtons from "../components/Home/BottomButtons";
import Footer from "../components/Home/Footer";
import SignUp from "../components/SignUp/SignUp";
import ModalWindow from "../components/UI/Modal/ModalWindow";

import "../components/Home/Home.css";

const HomePage = () => {
    const [showSignUp, setShowSignUp] = React.useState(false);

    const openSignUpForm = () => {
        setShowSignUp(true);
    }

    const closeSignUpForm = () => {
        setShowSignUp(false);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar openSignUpForm={openSignUpForm} />
            <Hero openSignUpForm={openSignUpForm} />
            <FeaturesBlocks />
            <Advantages />
            <PhoneInstall />
            <BottomButtons openSignUpForm={openSignUpForm} />
            <Footer />
            <ModalWindow
                open={showSignUp}
                handleClose={closeSignUpForm}
                content={<SignUp closeSignUpForm={closeSignUpForm} />}
            />
        </React.Fragment>
    );
};

export default HomePage;