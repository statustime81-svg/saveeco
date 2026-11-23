import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormValues,
} from "../../lib/validation";
import { useLeadSubmission } from "../../hooks/useLeadSubmission";

const controlClass =
  "mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function ContactForm() {
  const { submitContact } = useLeadSubmission();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { consent: false },
  });

  async function onSubmit(values: ContactFormValues) {
    await submitContact.mutateAsync(values);
    reset({ consent: false });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Name" error={errors.name?.message}>
        <input {...register("name")} className={controlClass} autoComplete="name" />
      </Field>

      <Field label="Phone" error={errors.phone?.message}>
        <input {...register("phone")} className={controlClass} type="tel" autoComplete="tel" />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input {...register("email")} className={controlClass} type="email" autoComplete="email" />
      </Field>

      <Field label="Subject" error={errors.subject?.message}>
        <input {...register("subject")} className={controlClass} />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea {...register("message")} className={controlClass} rows={5} />
      </Field>

      <label className="flex items-start gap-3 text-sm leading-6 text-muted">
        <input
          {...register("consent")}
          type="checkbox"
          className="mt-1 size-4 accent-primary"
        />
        <span>
          I consent to Save Eco using these details to respond to my enquiry.
        </span>
      </label>
      {errors.consent && (
        <p className="text-sm text-danger">{errors.consent.message}</p>
      )}

      {submitContact.isSuccess && (
        <p className="rounded-lg bg-primary-light p-3 text-sm text-primary-dark">
          Your enquiry has been submitted.
        </p>
      )}

      {submitContact.isError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-danger">
          {submitContact.error.message}
        </p>
      )}

      <button
        type="submit"
        disabled={submitContact.isPending}
        className="min-h-11 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {submitContact.isPending ? "Submitting..." : "Send a message"}
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <div>
      <span className="block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </div>
  );
}