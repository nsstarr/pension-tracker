"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { PensionData } from "./PensionForm";
import { calculateRetirementBalance } from "@/utils/calculations";
import { JOB_START_AGE, END_AGE } from "@/utils/constants";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

interface ProjectionChartProps {
  data: PensionData;
}

const ProjectionChart: React.FC<ProjectionChartProps> = ({ data }) => {
  const {
    annualIncome,
    employerContribution,
    personalContribution,
    retirementAge,
  } = data;

  const balanceOverTime = calculateRetirementBalance(
    retirementAge,
    employerContribution,
    personalContribution,
    annualIncome
  );
  const totalYears = END_AGE - JOB_START_AGE + 1;

  //  Labels for each year from the start age to the age of 81
  const labels = Array.from(
    { length: totalYears },
    (_, i) => i + JOB_START_AGE
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Projected Pension Pot Over Time",
        data: balanceOverTime,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="mt-10 w-full max-w-3xl">
      <Line data={chartData} />
    </div>
  );
};

export default ProjectionChart;
