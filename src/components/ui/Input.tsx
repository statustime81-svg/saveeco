import { useId, type InputHTMLAttributes } from "react";
import FormError from "./FormError";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export default function Input({ label, error, hint, id, className = "", ...props }: Props) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink">{label}</label>}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? inputId + "-error" : undefined}
        className={[
          "min-h-11 w-full rounded-lg border bg-white px-3 py-2 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-gray-100",
          error ? "border-danger focus:border-danger" : "border-gray-300 focus:border-primary",
          className,
        ].filter(Boolean).join(" ")}
        {...props}
      />
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <FormError id={inputId + "-error"}>{error}</FormError>}
    </div>
  );
}
