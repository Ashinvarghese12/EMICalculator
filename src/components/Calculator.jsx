import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Table, TableHead,
  TableRow, TableCell, TableBody, Paper, Grid,
  MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import useEMICalculator from '../hooks/useEMICalculator';
import { generateAmortizationSchedule } from '../utils/amortization';
import useExchangeRates from '../hooks/useExchangeRates';

const Calculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [currency, setCurrency] = useState('USD');

  const [errors, setErrors] = useState({
    principal: false,
    rate: false,
    years: false
  });

  const { rates, loading } = useExchangeRates('USD');

  const handleNumberInput = (e, setter) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  const calculateEMI = () => {
    const newErrors = {
      principal: principal === '',
      rate: rate === '',
      years: years === ''
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    const months = Number(years) * 12;
    const result = useEMICalculator(Number(principal), Number(rate), months);
    setEmi(result);
    setSchedule(generateAmortizationSchedule(Number(principal), Number(rate), months));
  };

  const resetTable = () => {
    setPrincipal('');
    setRate('');
    setYears('');
    setEmi(null);
    setSchedule([]);
    setErrors({ principal: false, rate: false, years: false });
  };

  const convertedEmi = rates && currency && emi
    ? (emi * rates[currency]).toFixed(2)
    : '';

  return (
    <Box>
      <Typography variant="h4" mt={3} gutterBottom>
        Loan Calculator Dashboard
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Loan Amount"
            fullWidth
            value={principal}
            onChange={e => handleNumberInput(e, setPrincipal)}
            error={errors.principal}
            helperText={errors.principal ? 'Required' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Interest Rate (%)"
            fullWidth
            value={rate}
            onChange={e => handleNumberInput(e, setRate)}
            error={errors.rate}
            helperText={errors.rate ? 'Required' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Term (Years)"
            fullWidth
            value={years}
            onChange={e => handleNumberInput(e, setYears)}
            error={errors.years}
            helperText={errors.years ? 'Required' : ''}
          />
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={calculateEMI}>
        CALCULATE
      </Button>

      {emi && (
        <>
          <Typography mt={3} variant="h6">
            Monthly EMI: <strong>${emi}</strong>
          </Typography>

          <Box mt={2} display="flex" flexWrap="wrap" alignItems="center" gap={2}>
            <FormControl>
              <InputLabel>Currency</InputLabel>
              <Select
                value={currency}
                label="Currency"
                onChange={(e) => setCurrency(e.target.value)}
                sx={{ minWidth: 80 }}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
                <MenuItem value="JPY">JPY</MenuItem>
                <MenuItem value="AUD">AUD</MenuItem>
                <MenuItem value="CAD">CAD</MenuItem>
              </Select>
            </FormControl>

            <Typography>
              Converted EMI: <strong>{loading ? '...' : `${convertedEmi} ${currency}`}</strong>
            </Typography>

            <Button
              variant="outlined"
              color="secondary"
              onClick={resetTable}
              sx={{
                borderColor: 'purple',
                color: 'purple',
                height: '40px',
                ml: 'auto',
              }}
            >
              RESET TABLE
            </Button>
          </Box>

          <Box
            mt={4}
            sx={{
              minHeight: 455,
              maxHeight: '50vh',
              borderRadius: 2,
              boxShadow: 3,
              p: 2,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Amortization Schedule ({currency})
            </Typography>

            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                maxHeight: '100%',
              }}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ padding: '8px 16px', fontWeight: 'bold' }}>Month</TableCell>
                    <TableCell sx={{ padding: '8px 16px', fontWeight: 'bold' }} align="right">Principal</TableCell>
                    <TableCell sx={{ padding: '8px 16px', fontWeight: 'bold' }} align="right">Interest</TableCell>
                    <TableCell sx={{ padding: '8px 16px', fontWeight: 'bold' }} align="right">Remaining Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schedule.map((row) => (
                    <TableRow key={row.month} hover>
                      <TableCell sx={{ padding: '8px 16px' }}>{row.month}</TableCell>
                      <TableCell sx={{ padding: '8px 16px' }} align="right">
                        {(row.principalPaid * rates[currency]).toFixed(2)} {currency}
                      </TableCell>
                      <TableCell sx={{ padding: '8px 16px' }} align="right">
                        {(row.interestPaid * rates[currency]).toFixed(2)} {currency}
                      </TableCell>
                      <TableCell sx={{ padding: '8px 16px' }} align="right">
                        {(row.balance * rates[currency]).toFixed(2)} {currency}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Calculator;
