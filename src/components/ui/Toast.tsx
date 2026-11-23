import { CircleCheck, CircleAlert, X } from "lucide-react";
import type { ReactNode } from "react";

type ToastProps = { open: boolean; tone?: "success" | "error"; title?: string; onClose: () => void; children?: ReactNode };

export default function Toast({ open, tone = "success", title, onClose, children }: ToastProps) {
  if (!open) return null;
  const success = tone === "success";
  const Icon = success ? CircleCheck : CircleAlert;
  return (
    <div role={success ? "status" : "alert"} className={`fixed bottom-5 right-5 z-[100] flex max-w-sm gap-3 rounded-xl border bg-white p-4 shadow-xl ${success ? "border-green-200" : "border-red-200"}`}>
      <Icon className={success ? "shrink-0 text-green-700" : "shrink-0 text-red-700"} size={20} />
      <div className="min-w-0 flex-1"><p className="font-semibold text-ink">{title ?? (success ? "Success" : "Something went wrong")}</p>{children && <div className="mt-1 text-sm text-muted">{children}</div>}</div>
      <button type="button" onClick={onClose} aria-label="Dismiss notification" className="shrink-0 text-muted hover:text-ink"><X size={17} /></button>
    </div>
  );
}
