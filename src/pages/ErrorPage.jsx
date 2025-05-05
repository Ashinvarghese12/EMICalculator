import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';


const ErrorPage = () => (
    <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h5" mb={3}>Something went wrong in the application</Typography>
        <Button p={5} sx={{ border: '1px solid' }} >
            <NavLink to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                Go home
            </NavLink>
        </Button>
    </Box>
);

export default ErrorPage;
