import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AdminHeader() {
  const navigate = useNavigate();

  async function handleLogout() {
    const client = supabase;

    if (client) {
      await client.auth.signOut();
    }

    navigate("/admin/login", { replace: true });
  }

  return (
    <header className="flex min-h-16 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
      <div>
        <p className="text-xs text-slate-500">Save Eco Organic</p>
        <p className="text-sm font-semibold text-slate-900">Admin panel</p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </header>
  );
}