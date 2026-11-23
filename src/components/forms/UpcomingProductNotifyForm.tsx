import { useState, type FormEvent } from "react";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

type UpcomingProductNotifyFormProps = { productName: string };

export default function UpcomingProductNotifyForm({ productName }: UpcomingProductNotifyFormProps) {
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("");
    if (!isSupabaseConfigured || !supabase) { setStatus("Supabase is not configured. Please contact us by phone."); return; }
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    if (!email && !phone) { setStatus("Enter an email address or phone number."); return; }
    setSaving(true);
    const { error } = await (supabase as any).from("product_notifications").insert({ product_name: productName, email: email || null, phone: phone || null, consent: true });
    setSaving(false);
    if (error) { setStatus(error.message); return; }
    formElement.reset(); setStatus("Thanks. We will notify you when this product is available.");
  }
  return <form onSubmit={submit} className="space-y-3 rounded-xl bg-cream p-4">
    <p className="font-semibold text-ink">Get notified when it launches</p>
    <label className="block text-sm text-muted">Email<input name="email" type="email" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2" autoComplete="email" /></label>
    <label className="block text-sm text-muted">Phone<input name="phone" type="tel" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2" autoComplete="tel" /></label>
    <label className="flex items-start gap-2 text-xs text-muted"><input name="consent" type="checkbox" required className="mt-0.5 accent-primary" />I agree to be contacted about this product.</label>
    {status && <p role="status" className="text-sm text-muted">{status}</p>}
    <button disabled={saving} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Saving…" : "Notify me"}</button>
  </form>;
}
