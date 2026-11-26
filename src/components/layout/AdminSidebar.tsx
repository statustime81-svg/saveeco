import { NavLink } from "react-router-dom";
import {
  Award,
  BarChart3,
  Boxes,
  CircleHelp,
  FolderTree,
  Image,
  LayoutDashboard,
  MessageSquare,
  PanelsTopLeft,
  Settings,
  Sprout,
  Users,
} from "lucide-react";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { to: "/admin/partners", label: "Partner leads", icon: Users },
  { to: "/admin/categories", label: "Categories", icon: FolderTree },
  { to: "/admin/products", label: "Products", icon: Boxes },
  { to: "/admin/gallery", label: "Gallery", icon: Image },
  { to: "/admin/banners", label: "Banners", icon: PanelsTopLeft },
  { to: "/admin/team", label: "Team", icon: Users },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { to: "/admin/certificates", label: "Certificates", icon: Award },
  { to: "/admin/faqs", label: "FAQs", icon: CircleHelp },
  { to: "/admin/stats", label: "Site stats", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="saveeco-admin-sidebar sticky top-0 z-40 w-full border-b border-[#e5eadf] bg-[#143b24] text-[#f8f4e8] lg:fixed lg:inset-y-0 lg:left-0 lg:h-screen lg:w-[86px] lg:border-b-0 lg:border-r lg:border-white/10">
      <div className="saveeco-admin-brand flex items-center justify-between px-4 py-3 lg:justify-center lg:px-0 lg:py-5">
        <NavLink to="/admin" aria-label="Save Eco Organic dashboard" className="group flex items-center gap-3 lg:justify-center">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#4abd00] text-[#143b24] shadow-[0_6px_20px_rgba(74,189,0,.2)] transition duration-300 group-hover:rotate-[-5deg] group-hover:scale-105 lg:size-12">
            <Sprout size={24} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="saveeco-admin-brand-copy lg:hidden">
            <span className="block font-heading text-base font-semibold leading-tight">Save Eco Organic</span>
            <span className="mt-0.5 block text-[.6rem] font-bold uppercase tracking-[.16em] text-[#c6d9b4]">Admin dashboard</span>
          </span>
        </NavLink>
        <span className="saveeco-admin-vertical-brand hidden text-[.55rem] font-bold uppercase tracking-[.18em] text-[#c6d9b4] [writing-mode:vertical-rl] lg:block">Save Eco</span>
      </div>

      <nav aria-label="Admin navigation" className="saveeco-admin-nav flex gap-1.5 overflow-x-auto px-3 pb-3 lg:mt-4 lg:h-[calc(100vh-92px)] lg:flex-col lg:items-center lg:overflow-y-auto lg:px-2 lg:pb-4">
        {links.map(({ to, label, icon: Icon, end }, index) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={label}
            aria-label={label}
            className={({ isActive }) =>
              `saveeco-admin-link group relative flex min-h-10 shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 lg:size-12 lg:min-h-12 lg:justify-center lg:gap-0 lg:px-0 lg:py-0 ${
                index === 5 ? "lg:mt-3" : ""
              } ${
                isActive
                  ? "bg-[#4abd00] font-semibold text-[#143b24] shadow-[0_8px_18px_rgba(74,189,0,.2)]"
                  : "text-[#e6eddc] hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={19} strokeWidth={1.8} className="shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
            <span className="saveeco-admin-label lg:hidden">{label}</span>
            <span className="saveeco-admin-tooltip pointer-events-none absolute left-[calc(100%+10px)] z-50 hidden whitespace-nowrap rounded-lg bg-[#123b22] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 lg:block">
              {label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
