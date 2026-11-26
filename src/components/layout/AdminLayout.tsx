import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f6f8f1] font-body text-[#173b25] lg:flex">
      <AdminSidebar />

      <div className="min-w-0 flex-1 lg:pl-[86px]">
        <AdminHeader />
        <main className="min-h-[calc(100vh-64px)] p-3 sm:p-4 lg:p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
