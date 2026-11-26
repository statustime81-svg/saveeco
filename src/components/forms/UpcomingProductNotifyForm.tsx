import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

type UpcomingProductNotifyFormProps = { productName: string };

export default function UpcomingProductNotifyForm({
  productName,
}: UpcomingProductNotifyFormProps) {
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    if (!isSupabaseConfigured || !supabase) {
      setStatus("Supabase is not configured. Please contact us by phone.");
      return;
    }

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    if (!email && !phone) {
      setStatus("Enter an email address or phone number.");
      return;
    }

    setSaving(true);
    const { error } = await (supabase as any)
      .from("product_notifications")
      .insert({
        product_name: productName,
        email: email || null,
        phone: phone || null,
        consent: true,
      });
    setSaving(false);

    if (error) {
      setStatus(error.message);
      return;
    }
    formElement.reset();
    setStatus("Thanks. We will notify you when this product is available.");
  }

  const inputClass =
    "mt-1.5 h-11 w-full rounded-xl border border-[#dce5d2] bg-white px-3.5 text-sm text-[#173b25] outline-none transition placeholder:text-[#9aa494] focus:border-[#84ba50] focus:ring-4 focus:ring-[#84ba50]/10";

  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      <label className="block text-xs font-semibold text-[#607064]">
        Email address
        <input
          name="email"
          type="email"
          className={inputClass}
          autoComplete="email"
          placeholder="you@example.com"
        />
      </label>
      <label className="block text-xs font-semibold text-[#607064]">
        Phone number
        <input
          name="phone"
          type="tel"
          className={inputClass}
          autoComplete="tel"
          placeholder="Your phone number"
        />
      </label>
      <label className="flex items-start gap-2 text-xs leading-5 text-[#71806f] sm:col-span-2">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 size-4 shrink-0 accent-[#4abd00]"
        />
        I agree to be contacted about this product.
      </label>
      {status && (
        <p
          role="status"
          className="rounded-xl bg-white/80 px-3 py-2 text-xs leading-5 text-[#526252] sm:col-span-2"
        >
          {status}
        </p>
      )}
      <button
        disabled={saving}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#4abd00] px-5 text-sm font-bold text-[#143b20] shadow-[0_7px_18px_rgba(74,189,0,.16)] transition hover:-translate-y-0.5 hover:bg-[#43ad00] disabled:cursor-wait disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
      >
        {saving ? "Saving…" : "Notify me"}
        {!saving && <ArrowRight size={16} aria-hidden="true" />}
      </button>
    </form>
  );
}
