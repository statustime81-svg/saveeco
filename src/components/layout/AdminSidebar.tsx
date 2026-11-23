import { NavLink } from "react-router-dom";
import {
  Boxes,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
  Image,
  FolderTree,
  MessageSquare,
  CircleHelp,
  Award,
  BarChart3,
  PanelsTopLeft,
} from "lucide-react";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/enquiries", label: "Enquiries", icon: ClipboardList },
  { to: "/admin/partners", label: "Partner leads", icon: Users },
  { to: "/admin/products", label: "Products", icon: Boxes },
  { to: "/admin/categories", label: "Categories", icon: FolderTree },
  { to: "/admin/banners", label: "Banners", icon: PanelsTopLeft },
  { to: "/admin/gallery", label: "Gallery", icon: Image },
  { to: "/admin/team", label: "Team", icon: Users },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { to: "/admin/faqs", label: "FAQs", icon: CircleHelp },
  { to: "/admin/certificates", label: "Certificates", icon: Award },
  { to: "/admin/stats", label: "Site stats", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="w-full border-b border-slate-200 bg-white p-4 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="mb-5 flex items-center gap-2 px-2 font-bold text-[#17652b]">
        <span className="grid size-9 place-items-center rounded-xl bg-green-50">
          <Boxes size={19} />
        </span>
        Save Eco Admin
      </div>

      <nav className="flex gap-2 overflow-x-auto lg:flex-col">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                isActive
                  ? "bg-green-50 font-semibold text-[#17652b]"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
