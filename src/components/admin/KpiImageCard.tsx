import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: number;
  hint: string;
  image: string;
  Icon: LucideIcon;
  onClick: () => void;
  selected?: boolean;
  actionLabel?: string;
  delay?: number;
};

export function useCountUp(value: number, delay = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setCount(value);
      return;
    }

    let frame = 0;
    let timer = 0;
    let startTime = 0;
    const duration = 1000;
    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    timer = window.setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [value, delay]);

  return count;
}

export default function KpiImageCard({
  label,
  value,
  hint,
  image,
  Icon,
  onClick,
  selected = false,
  actionLabel = "View matching records",
  delay = 0,
}: Props) {
  const count = useCountUp(value, delay);

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${label}: ${value}. ${actionLabel}`}
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      className={`admin-kpi-image-card group relative isolate min-h-[126px] overflow-hidden rounded-[1.35rem] border bg-transparent p-4 text-left shadow-[0_8px_24px_rgba(27,58,34,.07)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(27,58,34,.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4abd00] sm:min-h-[142px] sm:p-5 ${selected ? "border-[#74a944] ring-2 ring-[#8abd51]/20" : "border-[#e2e9dc] hover:border-[#b8d39a]"}`}
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="admin-kpi-image absolute inset-0 z-0 h-full w-full object-cover object-center"
      />
      <span aria-hidden="true" className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(255,254,249,.97)_0%,rgba(255,254,249,.84)_34%,rgba(255,254,249,.48)_62%,rgba(19,59,34,.04)_100%)] transition duration-500 group-hover:from-white/90 group-hover:via-white/65" />
      <span aria-hidden="true" className="absolute inset-x-5 bottom-0 z-20 h-px origin-left scale-x-0 bg-gradient-to-r from-[#66aa2d] via-[#b3d873] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

      <span className="relative z-20 flex items-start justify-between gap-3">
        <span>
          <span className="block text-xs font-bold text-[#536653]">{label}</span>
          <span className="mt-2 block font-heading text-3xl font-semibold leading-none tracking-[-.04em] tabular-nums text-[#153b25] sm:text-4xl">{count}</span>
          <span className="mt-2 block text-[11px] font-medium text-[#687866]">{hint}</span>
        </span>
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/70 bg-white/75 text-[#397b30] shadow-sm backdrop-blur-sm transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:bg-[#4abd00] group-hover:text-white">
          <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
        </span>
      </span>
      <span className="sr-only">{actionLabel}</span>
    </button>
  );
}
