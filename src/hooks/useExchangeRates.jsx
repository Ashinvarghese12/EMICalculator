import { useEffect, useState } from 'react';
import axios from 'axios';

const useExchangeRates = (baseCurrency = 'USD') => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/b4cc66c46cbfed01af14c2c4/latest/${baseCurrency}`
        );
        setRates(response.data.conversion_rates);
      } catch (err) {
        setError(err.message || 'Failed to fetch exchange rates');
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, [baseCurrency]);

  return { rates, loading, error };
};

export default useExchangeRates;
