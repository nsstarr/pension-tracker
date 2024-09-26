"use client";
import { formatNumberToCommaString } from "@/utils/formatting";
import { ChangeEvent, useState } from "react";

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


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid max-w-md gap-6">
      <div>
        <label className="mb-2 block">
          Desired Annual Income in Retirement (£)
        </label>
        <input
          type="text"
          name="annualIncome"
          value={formatNumberToCommaString(formData.annualIncome)}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-3 py-2 text-gray-900"
          placeholder="e.g., 16,000"
        />
      </div>
      <div>
        <label className="mb-2 block">Employer Monthly Contribution (£)</label>
        <input
          type="text"
          name="employerContribution"
          value={formatNumberToCommaString(formData.employerContribution)}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-3 py-2 text-gray-900"
          placeholder="e.g., 500"
        />
      </div>
      <div>
        <label className="mb-2 block">Personal Monthly Contribution (£)</label>
        <input
          type="text"
          name="personalContribution"
          value={formatNumberToCommaString(formData.personalContribution)}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-3 py-2 text-gray-900"
          placeholder="e.g., 300"
        />
      </div>
      <div>
        <label className="mb-2 block">Age You Wish to Retire</label>
        <input
          type="text"
          name="retirementAge"
          value={formData.retirementAge.toString()}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-3 py-2 text-gray-900"
          placeholder="e.g., 65"
        />
      </div>
      <div>
        <label className="mb-2 block">Current Pension Pot</label>
        <input
          type="text"
          name="currentPensionPot"
          value={formatNumberToCommaString(formData.currentPensionPot)}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2 text-gray-900"
          placeholder="e.g., 0"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Calculate
      </button>
    </form>
  );
};

export default PensionForm;
