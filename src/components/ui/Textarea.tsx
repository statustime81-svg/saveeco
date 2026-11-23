import { useId, type TextareaHTMLAttributes } from "react";
import FormError from "./FormError";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export default function Textarea({ label, error, hint, id, className = "", ...props }: Props) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div className="w-full">
      {label && <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-ink">{label}</label>}
      <textarea
        id={textareaId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? textareaId + "-error" : undefined}
        className={[
          "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-gray-100",
          error ? "border-danger focus:border-danger" : "border-gray-300 focus:border-primary",
          className,
        ].filter(Boolean).join(" ")}
        {...props}
      />
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <FormError id={textareaId + "-error"}>{error}</FormError>}
    </div>
  );
}
