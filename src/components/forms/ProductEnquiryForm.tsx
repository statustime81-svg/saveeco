import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "../../lib/validation";
import { useLeadSubmission } from "../../hooks/useLeadSubmission";

type ProductEnquiryFormProps = { productName: string; onSuccess?: () => void };

export default function ProductEnquiryForm({ productName, onSuccess }: ProductEnquiryFormProps) {
  const { submitContact } = useLeadSubmission();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", phone: "", email: "", subject: `Product enquiry: ${productName}`, message: `I would like to know more about ${productName}.`, consent: false },
  });
  const onSubmit = async (values: ContactFormValues) => {
    try { await submitContact.mutateAsync(values); reset(); onSuccess?.(); }
    catch { /* Mutation error is shown below. */ }
  };
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    <label className="block text-sm font-medium text-ink">Name<input {...register("name")} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5" autoComplete="name" /></label>{errors.name?.message && <p className="text-sm text-danger">{errors.name.message}</p>}
    <label className="block text-sm font-medium text-ink">Phone<input {...register("phone")} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5" autoComplete="tel" /></label>{errors.phone?.message && <p className="text-sm text-danger">{errors.phone.message}</p>}
    <label className="block text-sm font-medium text-ink">Email<input type="email" {...register("email")} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5" autoComplete="email" /></label>{errors.email?.message && <p className="text-sm text-danger">{errors.email.message}</p>}
    <label className="block text-sm font-medium text-ink">Message<textarea {...register("message")} rows={4} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5" /></label>{errors.message?.message && <p className="text-sm text-danger">{errors.message.message}</p>}
    <label className="flex items-start gap-2 text-sm text-muted"><input type="checkbox" {...register("consent")} className="mt-1 accent-primary" />I consent to Save Eco using these details to respond to my enquiry.</label>{errors.consent?.message && <p className="text-sm text-danger">{errors.consent.message}</p>}
    {submitContact.isError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{submitContact.error.message}</p>}
    {submitContact.isSuccess && <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-800">Thank you. Your enquiry has been submitted.</p>}
    <button disabled={submitContact.isPending} className="rounded-lg bg-primary px-5 py-3 font-semibold text-white disabled:opacity-60">{submitContact.isPending ? "Sending…" : "Send enquiry"}</button>
  </form>;
}
