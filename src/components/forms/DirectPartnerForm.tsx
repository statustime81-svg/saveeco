import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  directPartnerSchema,
  type DirectPartnerValues,
} from "../../lib/validation";
import { useLeadSubmission } from "../../hooks/useLeadSubmission";

const controlClass =
  "mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function DirectPartnerForm() {
  const { submitPartner } = useLeadSubmission();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DirectPartnerValues>({
    resolver: zodResolver(directPartnerSchema),
    defaultValues: { consent: false },
  });

  async function onSubmit(values: DirectPartnerValues) {
    await submitPartner.mutateAsync({ ...values, partner_type: "direct" });
    reset({ consent: false });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <InputField label="Name" error={errors.name?.message}>
        <input {...register("name")} className={controlClass} autoComplete="name" />
      </InputField>

      <InputField label="Phone" error={errors.phone?.message}>
        <input {...register("phone")} className={controlClass} type="tel" autoComplete="tel" />
      </InputField>

      <InputField label="Email" error={errors.email?.message}>
        <input {...register("email")} className={controlClass} type="email" autoComplete="email" />
      </InputField>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label="State" error={errors.state?.message}>
          <input {...register("state")} className={controlClass} />
        </InputField>

        <InputField label="City" error={errors.city?.message}>
          <input {...register("city")} className={controlClass} />
        </InputField>
      </div>

      <InputField label="Referral / Sponsor ID (optional)">
        <input {...register("sponsor_id")} className={controlClass} />
      </InputField>

      <label className="flex items-start gap-3 text-sm leading-6 text-muted">
        <input
          {...register("consent")}
          type="checkbox"
          className="mt-1 size-4 accent-primary"
        />
        <span>
          I consent to Save Eco using these details to contact me about my
          enquiry.
        </span>
      </label>
      {errors.consent && (
        <p className="text-sm text-danger">{errors.consent.message}</p>
      )}

      {submitPartner.isSuccess && (
        <p className="rounded-lg bg-primary-light p-3 text-sm text-primary-dark">
          Your interest has been submitted.
        </p>
      )}

      {submitPartner.isError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-danger">
          {submitPartner.error.message}
        </p>
      )}

      <button
        type="submit"
        disabled={submitPartner.isPending}
        className="min-h-11 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {submitPartner.isPending ? "Submitting..." : "Submit interest"}
      </button>
    </form>
  );
}

type InputFieldProps = {
  label: string;
  error?: string;
  children?: ReactNode;
};

function InputField({ label, error, children }: InputFieldProps) {
  return (
    <div>
      <span className="block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </div>
  );
}