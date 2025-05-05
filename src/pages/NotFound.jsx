
import React from 'react';
import { Box, Typography } from '@mui/material';


const NotFound = () => (
    <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h5" mb={3}>404 - Page Not Found</Typography>
    </Box>
);

export default NotFound;
