import { ChangeEvent } from "react";
import Spinner from "../atoms/Spinner";
import Tooltip from "../atoms/Tooltip";

interface FormField {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  tooltipContent: string;
  value: string | number;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  submitLabel?: string;
}

const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  isLoading,
  submitLabel = "Submit",
}) => {
  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {fields.map((field) => (
        <div key={field.id}>
          <label
            htmlFor={field.id}
            className="mb-2 block font-medium text-gray-900 dark:text-white"
          >
            {field.label}
          </label>
          <Tooltip content={field.tooltipContent}>
            <input
              type="text"
              id={field.id}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              required={field.required}
              className="w-full rounded-lg border px-3 py-2 text-gray-900"
              placeholder={field.placeholder}
            />
          </Tooltip>
        </div>
      ))}

      <button
        type="submit"
        className={`flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 ${
          isLoading ? "cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : submitLabel}
      </button>
    </form>
  );
};

export default Form;
