import { useEffect } from "react";
import { X } from "lucide-react";
import ProductEnquiryForm from "../forms/ProductEnquiryForm";

type EnquiryModalProps = { open: boolean; productName: string; onClose: () => void };

export default function EnquiryModal({ open, productName, onClose }: EnquiryModalProps) {
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return <div className="fixed inset-0 z-[90] grid place-items-center bg-black/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="product-enquiry-title" className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
      <div className="mb-5 flex items-start justify-between gap-3"><div><h2 id="product-enquiry-title" className="font-heading text-2xl font-semibold text-ink">Product enquiry</h2><p className="mt-1 text-sm text-muted">{productName}</p></div><button type="button" onClick={onClose} aria-label="Close enquiry form" className="rounded-lg p-2 text-muted hover:bg-slate-100"><X /></button></div>
      <ProductEnquiryForm productName={productName} onSuccess={onClose} />
    </section>
  </div>;
}
