import React, { useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';
import useExchangeRates from '../hooks/useExchangeRates';

const ExchangeRatePage = () => {
  const baseCurrency = 'USD';
  const { rates, loading, error } = useExchangeRates(baseCurrency);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rateEntries = Object.entries(rates);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Live Exchange Rates (Base: {baseCurrency})
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant="h5" mb={3}>Something went wrong in the application</Typography>
          <Button p={5} sx={{ border: '1px solid' }} >
            <NavLink to={'EMICalculator/'} style={{ textDecoration: 'none', color: 'inherit' }}>
              Go home
            </NavLink>
          </Button>
        </Box>
      ) : (
        <Paper>
          <TableContainer sx={{ maxHeight: 'calc(100vh - 190px)', minHeight: 'calc(100vh - 190px)', overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Currency</strong></TableCell>
                  <TableCell align="right"><strong>Rate</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rateEntries
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(([currency, rate]) => (
                    <TableRow key={currency}>
                      <TableCell>{currency}</TableCell>
                      <TableCell align="right">{rate.toFixed(4)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={rateEntries.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20, 50, 100]}
          />
        </Paper>
      )}
    </Container>
  );
};

export default ExchangeRatePage;
