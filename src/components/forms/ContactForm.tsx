import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormValues,
} from "../../lib/validation";
import { useLeadSubmission } from "../../hooks/useLeadSubmission";

type ContactFormProps = {
  variant?: "default" | "home";
};

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
  compact?: boolean;
};

export default function ContactForm({ variant = "default" }: ContactFormProps) {
  const isHome = variant === "home";
  const controlClass = isHome
    ? "mt-1 min-h-9 w-full rounded-lg border border-[#dce5d3] bg-[#fbfcf8] px-3 py-1.5 text-[.82rem] text-[#173b25] outline-none transition placeholder:text-[#9aa593] focus:border-[#70ae30] focus:bg-white focus:ring-2 focus:ring-[#70ae30]/15"
    : "mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
  const submitButtonClass = isHome
    ? "group flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#4abd00] px-5 py-2.5 text-sm font-bold text-[#143b20] shadow-[0_8px_20px_rgba(74,189,0,.16)] transition hover:-translate-y-0.5 hover:bg-[#42ad00] hover:shadow-[0_12px_24px_rgba(74,189,0,.22)] disabled:cursor-wait disabled:opacity-60"
    : "min-h-11 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60";

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
    reset({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
      consent: false,
    });
  }

  return (
    <form
      className={isHome ? "space-y-2.5" : "space-y-4"}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className={isHome ? "grid gap-2.5 sm:grid-cols-2" : "space-y-4"}>
        <Field label="Name" error={errors.name?.message} compact={isHome}>
          <input
            {...register("name")}
            className={controlClass}
            autoComplete="name"
            placeholder="Your name"
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message} compact={isHome}>
          <input
            {...register("phone")}
            className={controlClass}
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
          />
        </Field>
      </div>

      <div className={isHome ? "grid gap-2.5 sm:grid-cols-2" : "space-y-4"}>
        <Field label="Email" error={errors.email?.message} compact={isHome}>
          <input
            {...register("email")}
            className={controlClass}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Subject" error={errors.subject?.message} compact={isHome}>
          <input
            {...register("subject")}
            className={controlClass}
            placeholder="How can we help?"
          />
        </Field>
      </div>

      <Field label="Message" error={errors.message?.message} compact={isHome}>
        <textarea
          {...register("message")}
          className={`${controlClass} resize-y`}
          rows={isHome ? 2 : 5}
          placeholder="Write your message..."
        />
      </Field>

      <label
        className={`flex items-start leading-5 text-muted ${isHome ? "gap-2.5 text-xs" : "gap-3 text-sm leading-6"}`}
      >
        <input
          {...register("consent")}
          type="checkbox"
          className="mt-0.5 size-4 shrink-0 accent-[#4abd00]"
        />
        <span>
          I consent to Save Eco using these details to respond to my enquiry.
        </span>
      </label>

      {errors.consent && (
        <p className="text-sm text-danger">{errors.consent.message}</p>
      )}

      {submitContact.isSuccess && (
        <p
          role="status"
          className={`rounded-lg bg-primary-light text-sm text-primary-dark ${isHome ? "p-2.5" : "p-3"}`}
        >
          Your enquiry has been submitted.
        </p>
      )}

      {submitContact.isError && (
        <p
          role="alert"
          className={`rounded-lg bg-red-50 text-sm text-danger ${isHome ? "p-2.5" : "p-3"}`}
        >
          {submitContact.error.message}
        </p>
      )}

      <button
        type="submit"
        disabled={submitContact.isPending}
        className={submitButtonClass}
      >
        {submitContact.isPending ? "Sending..." : "Send message"}
        {isHome && (
          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </button>
    </form>
  );
}

function Field({ label, error, children, compact = false }: FieldProps) {
  return (
    <div>
      <span className={`block font-medium text-ink ${compact ? "text-xs" : "text-sm"}`}>
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </div>
  );
}
