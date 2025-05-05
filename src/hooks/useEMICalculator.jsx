const useEMICalculator = (principal, annualRate, months) => {
    if (!principal || !annualRate || !months) return 0;
    const monthlyRate = annualRate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                (Math.pow(1 + monthlyRate, months) - 1);
    return emi.toFixed(2);
  };
  
  export default useEMICalculator;
  