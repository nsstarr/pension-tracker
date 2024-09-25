export function calculateRetirementBalance(
  retirementAge: number,
  employerContribution: number,
  personalContribution: number,
  annualIncome: number,
  jobStartAge: number = 25 // Default job start age is 25
): number[] {
  const INTEREST_RATE = 1.049; // 4.9% interest rate
  const yearsToRetirement = retirementAge - jobStartAge;
  const monthlySavings = employerContribution + personalContribution;

  let currentPensionPot = 0;
  const balanceOverTime: number[] = [];

  // Accumulation phase
  for (let year = 0; year < yearsToRetirement; year++) {
    currentPensionPot += monthlySavings * 12; //
    currentPensionPot *= INTEREST_RATE; 
    balanceOverTime.push(currentPensionPot); 
  }

  // Decumulation phase with no interest applied
  const yearsAfterRetirement = 81 - retirementAge;
  for (let year = 0; year <= yearsAfterRetirement; year++) {
    balanceOverTime.push(currentPensionPot);
    currentPensionPot -= annualIncome; // Withdraw annual income

  }

  return balanceOverTime;
}
