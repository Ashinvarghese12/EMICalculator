import React from 'react';
import { Typography, Box } from '@mui/material';

const AboutPage = () =>
    <>
        <Box sx={{  display: 'flex', flexDirection: 'column',  mt: 4 }}>
        <Typography variant="h4" mt={5}>
            About this Application
        </Typography>
        <Typography sx={{fontSize:'18px'}} mt={1}>
        This Loan Calculator App is a modern, single-page web application built using React JS and Material UI.
        It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule,
        and see real-time currency conversions of their EMI using live exchange rates.
        </Typography>
        </Box>
    </>

export default AboutPage;
