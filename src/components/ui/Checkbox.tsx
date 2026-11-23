import { useId, type InputHTMLAttributes } from "react";
import FormError from "./FormError";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  error?: string;
};

export default function Checkbox({ label, error, id, className = "", ...props }: Props) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div>
      <label htmlFor={checkboxId} className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-ink">
        <input
          id={checkboxId}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? checkboxId + "-error" : undefined}
          className={["mt-1 size-4 shrink-0 rounded border-gray-300 accent-primary focus:ring-primary", className].filter(Boolean).join(" ")}
          {...props}
        />
        <span>{label}</span>
      </label>
      {error && <FormError id={checkboxId + "-error"}>{error}</FormError>}
    </div>
  );
}
