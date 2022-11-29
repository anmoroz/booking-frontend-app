import React from 'react';
import HelpContent from "../components/Help/HelpContent";
import Typography from "@mui/material/Typography";

const HelpPage = () => {
    return (
        <>
            <Typography variant="h5" component="h4">
                Помощь
            </Typography>
            <HelpContent />
        </>
    );
};

export default HelpPage;