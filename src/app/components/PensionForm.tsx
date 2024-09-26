"use client";
import { formatNumberToCommaString } from "@/utils/formatting";
import { ChangeEvent, useState } from "react";
import Tooltip from "./molecules/Tooltip"; // Import the Tooltip component
import Spinner from "./molecules/Spinner";

export interface PensionData {
  annualIncome: number;
  employerContribution: number;
  personalContribution: number;
  retirementAge: number;
  currentPensionPot: number;
}

interface PensionFormProps {
  onSubmit: (data: PensionData) => void;
}

const PensionForm: React.FC<PensionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PensionData>({
    annualIncome: 0,
    employerContribution: 0,
    personalContribution: 0,
    retirementAge: 65,
    currentPensionPot: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const formattedValue = value.replace(/[^0-9,]/g, "");

    // Converting input to a valid number
    const numericValue = formattedValue
      ? parseInt(formattedValue.replace(/,/g, ""))
      : 0;

    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    onSubmit(formData);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid max-w-md gap-6">
      <div>
        <label
          htmlFor="annualIncome"
          className="mb-2 block font-medium text-gray-900 dark:text-white"
        >
          Desired Annual Income in Retirement (£)
        </label>
        <Tooltip content="The annual income you wish to receive after retirement.">
          <input
            type="text"
            id="annualIncome"
            name="annualIncome"
            value={formatNumberToCommaString(formData.annualIncome)}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2 text-gray-900"
            placeholder="e.g., 16,000"
          />
        </Tooltip>
      </div>

      <div>
        <label
          htmlFor="employerContribution"
          className="mb-2 block font-medium text-gray-900 dark:text-white"
        >
          Employer Monthly Contribution (£)
        </label>
        <Tooltip content="The amount your employer contributes monthly to your pension pot.">
          <input
            type="text"
            id="employerContribution"
            name="employerContribution"
            value={formatNumberToCommaString(formData.employerContribution)}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2 text-gray-900"
            placeholder="e.g., 500"
          />
        </Tooltip>
      </div>

      <div>
        <label
          htmlFor="personalContribution"
          className="mb-2 block font-medium text-gray-900 dark:text-white"
        >
          Personal Monthly Contribution (£)
        </label>
        <Tooltip content="The amount you contribute monthly to your pension pot.">
          <input
            type="text"
            id="personalContribution"
            name="personalContribution"
            value={formatNumberToCommaString(formData.personalContribution)}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2 text-gray-900"
            placeholder="e.g., 300"
          />
        </Tooltip>
      </div>

      <div>
        <label
          htmlFor="retirementAge"
          className="mb-2 block font-medium text-gray-900 dark:text-white"
        >
          Age You Wish to Retire
        </label>
        <Tooltip content="The age at which you plan to retire.">
          <input
            type="text"
            id="retirementAge"
            name="retirementAge"
            value={formData.retirementAge.toString()}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2 text-gray-900"
            placeholder="e.g., 65"
          />
        </Tooltip>
      </div>

      <div>
        <label
          htmlFor="currentPensionPot"
          className="mb-2 block font-medium text-gray-900 dark:text-white"
        >
          Current Pension Pot (£)
        </label>
        <Tooltip content="The current total amount saved in your pension pot.">
          <input
            type="text"
            id="currentPensionPot"
            name="currentPensionPot"
            value={formatNumberToCommaString(formData.currentPensionPot)}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-gray-900"
            placeholder="e.g., 0"
          />
        </Tooltip>
      </div>

      <button
        type="submit"
        className={`flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 ${
          isLoading ? "cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Calculate"}
      </button>
    </form>
  );
};

export default PensionForm;
