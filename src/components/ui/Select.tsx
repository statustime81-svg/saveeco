import { useId, type SelectHTMLAttributes } from "react";
import FormError from "./FormError";

export type SelectOption = { label: string; value: string };

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
};

export default function Select({ label, error, options, placeholder = "Select an option", id, className = "", ...props }: Props) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="w-full">
      {label && <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink">{label}</label>}
      <select
        id={selectId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? selectId + "-error" : undefined}
        className={[
          "min-h-11 w-full rounded-lg border bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
          error ? "border-danger" : "border-gray-300",
          className,
        ].filter(Boolean).join(" ")}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      {error && <FormError id={selectId + "-error"}>{error}</FormError>}
    </div>
  );
}
