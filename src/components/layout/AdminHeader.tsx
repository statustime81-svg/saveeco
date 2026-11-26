import { useMemo, useState, type FormEvent } from "react";
import { ArrowUpRight, LogOut, Search, Sprout } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const adminDestinations = [
  { label: "Products", to: "/admin/products", terms: "products catalogue items" },
  { label: "Enquiries", to: "/admin/enquiries", terms: "enquiries messages contact inbox" },
  { label: "Partner leads", to: "/admin/partners", terms: "partners partner leads applications" },
  { label: "Gallery", to: "/admin/gallery", terms: "gallery photos videos media" },
  { label: "Categories", to: "/admin/categories", terms: "categories collections" },
  { label: "Certificates", to: "/admin/certificates", terms: "certificates documents" },
];

export default function AdminHeader() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const matches = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return adminDestinations.slice(0, 4);
    return adminDestinations.filter((item) => `${item.label} ${item.terms}`.toLowerCase().includes(term));
  }, [search]);

  async function handleLogout() {
    const client = supabase;
    if (client) await client.auth.signOut();
    navigate("/admin/login", { replace: true });
  }

  function goToFirstMatch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (matches[0]) {
      navigate(matches[0].to);
      setSearchOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center gap-4 border-b border-[#e9e3d4] bg-[#fbf7ec]/95 px-4 backdrop-blur-xl sm:px-6 lg:px-7">
      <div className="hidden shrink-0 items-center gap-3 xl:flex">
        <div>
          <p className="font-heading text-lg font-semibold leading-tight text-[#183d26]">Admin Dashboard</p>
          <p className="text-[.58rem] font-bold uppercase tracking-[.17em] text-[#7d8b69]">Save Eco Organic</p>
        </div>
      </div>

      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#e8f3dd] text-[#347d25] xl:hidden">
        <Sprout size={19} aria-hidden="true" />
      </span>

      <form onSubmit={goToFirstMatch} className="relative mx-auto hidden w-full max-w-[520px] md:block">
        <label className="relative block">
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#66775f]" aria-hidden="true" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onFocus={() => setSearchOpen(true)}
            placeholder="Search products, enquiries, partners..."
            aria-label="Search admin pages"
            aria-expanded={searchOpen}
            className="h-10 w-full rounded-full border border-[#ded8c8] bg-white/80 pl-10 pr-16 text-sm text-[#284632] outline-none transition placeholder:text-[#8d9182] focus:border-[#9bb77f] focus:bg-white focus:ring-4 focus:ring-[#79b449]/10"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md border border-[#e8dfc8] bg-[#f5edda] px-2 py-1 text-[.62rem] font-semibold text-[#777356]">↵</kbd>
        </label>

        {searchOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-[#e5e8da] bg-white p-2 shadow-[0_16px_40px_rgba(28,57,32,.15)]">
            <p className="px-3 pb-1 pt-1 text-[.6rem] font-bold uppercase tracking-[.15em] text-[#8a967d]">Admin pages</p>
            {matches.length ? matches.map((item) => (
              <button
                key={item.to}
                type="button"
                onClick={() => { navigate(item.to); setSearchOpen(false); setSearch(""); }}
                className="flex min-h-10 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-medium text-[#36563c] transition hover:bg-[#f2f7eb] hover:text-[#28652c]"
              >
                {item.label}<ArrowUpRight size={14} aria-hidden="true" />
              </button>
            )) : <p className="px-3 py-3 text-xs text-[#7c887a]">No matching admin pages found.</p>}
          </div>
        )}
      </form>

      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
        <Link
          to="/"
          target="_blank"
          className="hidden min-h-9 items-center gap-1.5 rounded-full border border-[#dce8d2] bg-white px-3.5 text-xs font-semibold text-[#315e34] transition hover:-translate-y-0.5 hover:border-[#9bc976] hover:bg-[#f7fbf2] sm:inline-flex"
        >
          View website <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
        <span className="hidden size-9 place-items-center rounded-full border border-[#d8e4ce] bg-[#e9f3df] font-heading text-sm font-semibold text-[#285b31] sm:grid" aria-label="Admin profile">A</span>
        <button
          type="button"
          onClick={() => void handleLogout()}
          className="inline-flex min-h-9 items-center gap-2 rounded-full bg-[#174b2b] px-3.5 text-xs font-semibold text-white shadow-[0_6px_16px_rgba(23,75,43,.15)] transition hover:-translate-y-0.5 hover:bg-[#236638] hover:shadow-[0_10px_20px_rgba(23,75,43,.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4abd00]"
        >
          <LogOut size={15} aria-hidden="true" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}
