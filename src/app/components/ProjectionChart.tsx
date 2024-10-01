"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { PensionData } from "./PensionForm";
import { calculateBalance } from "@/utils/calculateBalance";
import { JOB_START_AGE, END_AGE } from "@/utils/constants";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

interface ProjectionChartProps {
  data: PensionData;
}

const ProjectionChart: React.FC<ProjectionChartProps> = ({ data }) => {
  const {
    annualIncome,
    employerContribution,
    personalContribution,
    retirementAge,
    currentPensionPot,
  } = data || {};

  // Total balance over time with all contributions
  const balanceOverTime = calculateBalance(
    retirementAge,
    employerContribution,
    personalContribution,
    annualIncome,
    currentPensionPot // Include the current pension pot in the calculation
  );

  // Contribution from the current pension pot alone
  const currentPotOnlyBalanceOverTime = calculateBalance(
    retirementAge,
    0, // No employer contributions
    0, // No personal contributions
    annualIncome,
    currentPensionPot // Include only the current pension pot
  );

  const yearsFromRetirementToEndAge = END_AGE - retirementAge + 1;
  //  index in the balanceOverTime array that corresponds to the year of retirement.
  const retirementIndex = balanceOverTime?.length - yearsFromRetirementToEndAge;

  // determine the value of the pension pot at the time of retirement.
  const projectedPensionPot = Math.floor(balanceOverTime?.[retirementIndex]);

  const desiredPensionPot = Math.floor(
    annualIncome ? annualIncome * (END_AGE - retirementAge) : 0
  );

  const totalYears = END_AGE - JOB_START_AGE + 1;

  // Labels for each year from the start age to the age of 81
  const labels = Array.from(
    { length: totalYears },
    (_, i) => i + JOB_START_AGE
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Projected Pension",
        data: balanceOverTime,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
      {
        label: "Current Pension Pot Contribution",
        data: currentPotOnlyBalanceOverTime,
        fill: false,
        borderColor: "rgba(192,75,192,1)",
        tension: 0.1,
      },
      {
        label: "Desired Pension Pot",
        data: Array(totalYears).fill(desiredPensionPot),
        fill: false,
        borderColor: "rgba(192,75,75,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-full max-w-3xl rounded-lg border border-gray-200 bg-white p-5 shadow md:p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 text-center">
        <h2 className="mb-8 py-3 text-2xl font-bold">
          Your Pension Summary 💰
        </h2>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Desired Pension Pot */}
          <div
            className="flex-1 rounded-lg p-4 text-center"
            style={{
              backgroundColor: "rgba(192,75,75,0.1)",
            }}
          >
            <h3 className="text-xs font-extrabold uppercase text-gray-800 dark:text-gray-200">
              Desired Pension Pot
            </h3>
            <p
              className="mt-2 text-4xl font-bold"
              style={{ color: "rgba(192,75,75,1)" }}
            >
              £{desiredPensionPot ? desiredPensionPot.toLocaleString() : "0"}
            </p>
          </div>

          {/* Projected Pension Pot at Retirement */}
          <div
            className="flex-1 rounded-lg p-4 text-center"
            style={{
              backgroundColor: "rgba(75,192,192,0.1)",
            }}
          >
            <h3 className="text-xs font-extrabold uppercase text-gray-800 dark:text-gray-200">
              Projected Pension Pot at Retirement
            </h3>
            <p
              className="mt-2 text-4xl font-bold"
              style={{ color: "rgba(75,192,192,1)" }}
            >
              £
              {projectedPensionPot ? projectedPensionPot.toLocaleString() : "0"}
            </p>
          </div>

          {/* Current Pension Pot Contribution */}
          <div
            className="flex-1 rounded-lg p-4 text-center"
            style={{
              backgroundColor: "rgba(192,75,192,0.1)", // Match the card background with the current pension pot color with opacity
            }}
          >
            <h3 className="text-xs font-extrabold uppercase text-gray-800 dark:text-gray-200">
              Current Pension Pot Contribution
            </h3>
            <p
              className="mt-2 text-4xl font-bold"
              style={{ color: "rgba(192,75,192,1)" }} // Match the text color with the current pension pot color
            >
              £{currentPensionPot ? currentPensionPot.toLocaleString() : "0"}
            </p>
          </div>
        </div>
      </div>
      <Line data={chartData} />
    </div>
  );
};

export default ProjectionChart;
