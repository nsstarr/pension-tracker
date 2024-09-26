import { JOB_START_AGE, END_AGE } from "./constants";

export function calculateBalance(
  retirementAge: number,
  employerContribution: number,
  personalContribution: number,
  annualIncome: number,
  currentPensionPot: number = 0 // Default to 0 if not provided
): number[] {
  const INTEREST_RATE = 1.049; // 4.9% interest rate
  const yearsToRetirement = retirementAge - JOB_START_AGE;
  const monthlySavings = employerContribution + personalContribution;

  let totalPensionPot = currentPensionPot;
  const balanceOverTime: number[] = [];

  // Accumulation phase
  for (let year = 0; year < yearsToRetirement; year++) {
    totalPensionPot += monthlySavings * 12;
    totalPensionPot *= INTEREST_RATE;
    balanceOverTime.push(totalPensionPot);
  }

  // Decumulation phase: Withdraw the annual income, no interest applied
  const yearsAfterRetirement = END_AGE - retirementAge;

  for (let year = 0; year <= yearsAfterRetirement; year++) {
    balanceOverTime.push(totalPensionPot);
    totalPensionPot -= annualIncome; // Withdraw annual income

    if (totalPensionPot <= 0) {
      balanceOverTime.push(0);
      break;
    }
  }

  return balanceOverTime;
}
