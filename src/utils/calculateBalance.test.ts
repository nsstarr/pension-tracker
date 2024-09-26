import { calculateBalance } from "./calculateBalance";

describe("calculateBalance", () => {
  it("should correctly calculate the pension pot with no current savings", () => {
    const result = calculateBalance(30, 200, 300, 16000, 0);
    // if the user retires at 30 after working for 5 years (starting age 25)
    // First Year: Initial 0 + (200 + 300) * 12 = 6000 contribution for the year
    // After interest: 6000 * 1.049 = 6294

    expect(result[0]).toBeCloseTo(6294, 2); // Check first year's result
  });

  it("should apply interest correctly over multiple years", () => {
    const result = calculateBalance(65, 200, 50, 16000, 0); 
    expect(result.length).toBe(57); 

    // Check the pot balance at the end of the accumulation phase (after 40 years with 4.9% interest applied annually)
    expect(result[39]).toBeCloseTo(371006.88, 2); // Check the value at retirement
  });

  it("should handle an existing pension pot correctly", () => {
    const result = calculateBalance(30, 200, 300, 16000, 10000);
    // Initial: 10,000 + 6000 = 16,000
    // After interest: 16,000 * 1.049 = 16,784
    expect(result[0]).toBeCloseTo(16784, 2);
  });

  it("should correctly decrease the pot during retirement", () => {
    const result = calculateBalance(30, 200, 300, 16000, 10000);
    const decumulationStartIndex = 5; // 5 years
    const pensionAfterRetirement = result[decumulationStartIndex] - 16000;
    expect(result[decumulationStartIndex + 1]).toBeCloseTo(
      pensionAfterRetirement,
      2
    );
  });

  it("should not go below zero during decumulation", () => {
    const result = calculateBalance(30, 100, 100, 20000, 0); //  high annual withdrawal
    // The last entry should end at zero
    expect(result[result.length - 1]).toBe(0);
  });
});
