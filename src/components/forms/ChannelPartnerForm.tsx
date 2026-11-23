import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  channelPartnerSchema,
  type ChannelPartnerValues,
} from "../../lib/validation";
import { useLeadSubmission } from "../../hooks/useLeadSubmission";

const controlClass =
  "mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function ChannelPartnerForm() {
  const { submitPartner } = useLeadSubmission();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChannelPartnerValues>({
    resolver: zodResolver(channelPartnerSchema),
    defaultValues: { consent: false },
  });

  async function onSubmit(values: ChannelPartnerValues) {
    await submitPartner.mutateAsync({ ...values, partner_type: "channel" });
    reset({ consent: false });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField label="Name" error={errors.name?.message}>
        <input {...register("name")} className={controlClass} autoComplete="name" />
      </FormField>

      <FormField label="Firm name" error={errors.firm_name?.message}>
        <input {...register("firm_name")} className={controlClass} autoComplete="organization" />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Phone" error={errors.phone?.message}>
          <input {...register("phone")} className={controlClass} type="tel" autoComplete="tel" />
        </FormField>

        <FormField label="Email" error={errors.email?.message}>
          <input {...register("email")} className={controlClass} type="email" autoComplete="email" />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="State" error={errors.state?.message}>
          <input {...register("state")} className={controlClass} />
        </FormField>

        <FormField label="District" error={errors.district?.message}>
          <input {...register("district")} className={controlClass} />
        </FormField>
      </div>

      <FormField label="Address" error={errors.address?.message}>
        <textarea {...register("address")} className={controlClass} rows={3} />
      </FormField>

      <FormField label="Experience" error={errors.experience?.message}>
        <input {...register("experience")} className={controlClass} />
      </FormField>

      <FormField label="GST number (optional)">
        <input {...register("gst_number")} className={controlClass} />
      </FormField>

      <FormField label="Message" error={errors.message?.message}>
        <textarea {...register("message")} className={controlClass} rows={4} />
      </FormField>

      <label className="flex items-start gap-3 text-sm leading-6 text-muted">
        <input
          {...register("consent")}
          type="checkbox"
          className="mt-1 size-4 accent-primary"
        />
        <span>
          I consent to Save Eco using these details to respond to my partner
          enquiry.
        </span>
      </label>
      {errors.consent && (
        <p className="text-sm text-danger">{errors.consent.message}</p>
      )}

      {submitPartner.isSuccess && (
        <p className="rounded-lg bg-primary-light p-3 text-sm text-primary-dark">
          Your partner enquiry has been submitted.
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
        {submitPartner.isPending
          ? "Submitting..."
          : "Submit channel partner enquiry"}
      </button>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div>
      <span className="block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </div>
  );
}