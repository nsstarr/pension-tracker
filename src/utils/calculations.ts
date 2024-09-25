import { JOB_START_AGE, END_AGE } from "./constants";

export function calculateRetirementBalance(
  retirementAge: number,
  employerContribution: number,
  personalContribution: number,
  annualIncome: number
): number[] {
  const INTEREST_RATE = 1.049; // 4.9% interest rate
  const yearsToRetirement = retirementAge - JOB_START_AGE;
  const monthlySavings = employerContribution + personalContribution;

  let currentPensionPot = 0;
  const balanceOverTime: number[] = [];

  // Accumulation phase
  for (let year = 0; year < yearsToRetirement; year++) {
    currentPensionPot += monthlySavings * 12; 
    currentPensionPot *= INTEREST_RATE; 
    balanceOverTime.push(currentPensionPot); 
  }

  // Decumulation phase: Withdraw the annual income, no interest applied
  const yearsAfterRetirement = END_AGE - retirementAge;
  for (let year = 0; year <= yearsAfterRetirement; year++) {
    balanceOverTime.push(currentPensionPot);
    currentPensionPot -= annualIncome; // Withdraw annual income

    if (currentPensionPot <= 0) {
      balanceOverTime.push(0);
      break;
    }
  }

  return balanceOverTime;
}
