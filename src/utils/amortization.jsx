export const generateAmortizationSchedule = (principal, annualRate, months) => {
    const monthlyRate = annualRate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                (Math.pow(1 + monthlyRate, months) - 1);
  
    const schedule = [];
    let balance = principal;
  
    for (let i = 1; i <= months; i++) {
      const interest = balance * monthlyRate;
      const principalPaid = emi - interest;
      balance -= principalPaid;
  
      schedule.push({
        month: i,
        emi: emi.toFixed(2),
        principalPaid: principalPaid.toFixed(2),
        interestPaid: interest.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : '0.00',
      });
    }
  
    return schedule;
  };
  