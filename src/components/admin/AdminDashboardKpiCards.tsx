import { ClipboardList, Package, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useCountUp } from "./KpiImageCard";
import productPhoto from "../../assets/admin-dashboard/admin-products-card.png";
import enquiryPhoto from "../../assets/admin-dashboard/admin-enquiries-card.png";
import partnerPhoto from "../../assets/admin-dashboard/admin-partners-card.png";

type Props = {
  counts: { products: number; enquiries: number; partners: number };
};

export default function AdminDashboardKpiCards({ counts }: Props) {
  const cards = [
    { label: "Products", value: counts.products, hint: "Manage your catalogue", image: productPhoto, Icon: Package, to: "/admin/products" },
    { label: "Enquiries", value: counts.enquiries, hint: "Review customer messages", image: enquiryPhoto, Icon: ClipboardList, to: "/admin/enquiries" },
    { label: "Partner leads", value: counts.partners, hint: "View partnership interest", image: partnerPhoto, Icon: UsersRound, to: "/admin/partner-leads" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
      {cards.map((card, index) => <DashboardKpiCard key={card.label} {...card} delay={index * 90} />)}
    </div>
  );
}

type CardProps = {
  label: string;
  value: number;
  hint: string;
  image: string;
  Icon: LucideIcon;
  to: string;
  delay: number;
};

function DashboardKpiCard({ label, value, hint, image, Icon, to, delay }: CardProps) {
  const count = useCountUp(value, delay);

  return (
    <Link to={to} style={{ animationDelay: `${delay}ms` }} className="admin-dashboard-kpi group relative isolate block min-h-[145px] overflow-hidden rounded-[1.45rem] border border-[#e2e9dc] bg-transparent p-4 shadow-[0_8px_24px_rgba(27,58,34,.07)] transition duration-500 hover:-translate-y-1 hover:border-[#b8d39a] hover:shadow-[0_18px_38px_rgba(27,58,34,.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4abd00] sm:p-5">
      <img src={image} alt="" aria-hidden="true" className="admin-kpi-image absolute inset-0 z-0 h-full w-full object-cover object-center" />
      <span aria-hidden="true" className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(255,254,249,.97)_0%,rgba(255,254,249,.84)_34%,rgba(255,254,249,.48)_62%,rgba(19,59,34,.04)_100%)]" />
      <span aria-hidden="true" className="absolute inset-x-5 bottom-0 z-20 h-px origin-left scale-x-0 bg-gradient-to-r from-[#66aa2d] via-[#b3d873] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
      <span className="relative z-20 flex items-start justify-between gap-3">
        <span>
          <span className="block text-xs font-bold text-[#536653]">{label}</span>
          <span className="mt-2 block font-heading text-3xl font-semibold leading-none tracking-[-.04em] tabular-nums text-[#153b25] sm:text-4xl">{count}</span>
          <span className="mt-2 block text-[11px] font-medium text-[#687866]">{hint}</span>
          <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-extrabold text-[#367438]">Open section <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
        </span>
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/70 bg-white/75 text-[#397b30] shadow-sm backdrop-blur-sm transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:bg-[#4abd00] group-hover:text-white"><Icon size={19} strokeWidth={1.8} aria-hidden="true" /></span>
      </span>
    </Link>
  );
}
