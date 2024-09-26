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

  // Total balance over time considering all contributions
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

  // Projected pension pot at retirement age
  const projectedPensionPot =
    balanceOverTime[balanceOverTime.length - (END_AGE - retirementAge + 1)];

  const desiredPensionPot = annualIncome * (END_AGE - retirementAge);

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
        <h2 className="py-3 text-2xl font-bold">Pension Summary</h2>
        <p>
          <strong>Desired Pension Pot: </strong>£
          {desiredPensionPot ? desiredPensionPot.toLocaleString() : "0"}
        </p>
        <p>
          <strong>Projected Pension Pot at Retirement: </strong>£
          {projectedPensionPot ? projectedPensionPot.toLocaleString() : "0"}
        </p>
        <p>
          <strong>Current Pension Pot Contribution: </strong>£
          {currentPensionPot ? currentPensionPot.toLocaleString() : "0"}
        </p>
      </div>
      <Line data={chartData} />
    </div>
  );
};

export default ProjectionChart;
