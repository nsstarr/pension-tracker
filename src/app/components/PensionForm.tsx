"use client";
import { ChangeEvent, useState } from "react";
import Form from "./molecules/Form"; 
import { formatNumberToCommaString } from "@/utils/formatting";

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

  const fields = [
    {
      id: "annualIncome",
      name: "annualIncome",
      label: "Desired Annual Income in Retirement (£)",
      placeholder: "e.g., 16,000",
      tooltipContent: "The annual income you wish to receive after retirement.",
      value: formatNumberToCommaString(formData.annualIncome),
      required: true,
      onChange: handleChange,
    },
    {
      id: "employerContribution",
      name: "employerContribution",
      label: "Employer Monthly Contribution (£)",
      placeholder: "e.g., 500",
      tooltipContent:
        "The amount your employer contributes monthly to your pension pot.",
      value: formatNumberToCommaString(formData.employerContribution),
      required: true,
      onChange: handleChange,
    },
    {
      id: "personalContribution",
      name: "personalContribution",
      label: "Personal Monthly Contribution (£)",
      placeholder: "e.g., 300",
      tooltipContent: "The amount you contribute monthly to your pension pot.",
      value: formatNumberToCommaString(formData.personalContribution),
      required: true,
      onChange: handleChange,
    },
    {
      id: "retirementAge",
      name: "retirementAge",
      label: "Age You Wish to Retire",
      placeholder: "e.g., 65",
      tooltipContent: "The age at which you plan to retire.",
      value: formData.retirementAge.toString(),
      required: true,
      onChange: handleChange,
    },
    {
      id: "currentPensionPot",
      name: "currentPensionPot",
      label: "Current Pension Pot (£)",
      placeholder: "e.g., 0",
      tooltipContent: "The current total amount saved in your pension pot.",
      value: formatNumberToCommaString(formData.currentPensionPot),
      onChange: handleChange,
    },
  ];

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitLabel="Calculate"
    />
  );
};

export default PensionForm;
