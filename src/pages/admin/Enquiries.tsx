import { useEffect, useMemo, useState } from "react";
import { CheckCheck, ClipboardList, Mail, MessageCircle, Phone, RefreshCw, Search } from "lucide-react";
import KpiImageCard from "../../components/admin/KpiImageCard";
import productPhoto from "../../assets/admin-dashboard/admin-products-card.png";
import partnerPhoto from "../../assets/admin-dashboard/admin-partners-card.png";
import enquiryPhoto from "../../assets/admin-dashboard/admin-enquiries-card.png";
import { supabase } from "../../lib/supabase";

type Enquiry = {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
};

const statusStyles: Record<string, string> = {
  new: "border-[#dbe9c9] bg-[#f1f7e9] text-[#3f762f]",
  contacted: "border-[#d8e5ee] bg-[#eff6fa] text-[#416a81]",
  closed: "border-[#e4e4de] bg-[#f4f4f0] text-[#687267]",
};

export default function EnquiryLeads() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function loadItems() {
    setLoading(true);
    const client = supabase;
    if (!client) {
      setError("Supabase is not configured. Add the project URL and anon key.");
      setLoading(false);
      return;
    }
    const { data, error: loadError } = await client
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (loadError) setError(loadError.message);
    else {
      setError("");
      setItems((data ?? []) as Enquiry[]);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    const client = supabase;
    if (!client) {
      setError("Supabase is not configured. Add the project URL and anon key.");
      return;
    }
    setUpdatingId(id);
    setError("");
    const { error: updateError } = await client.from("enquiries").update({ status }).eq("id", id);
    if (updateError) setError(updateError.message);
    else setItems((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    setUpdatingId(null);
  }

  function focusInbox(status: string) {
    setStatusFilter(status);
    window.requestAnimationFrame(() => {
      document.getElementById("enquiry-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  useEffect(() => {
    void loadItems();
  }, []);

  const visibleItems = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return items.filter((item) => {
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const searchable = [item.name, item.phone, item.email, item.subject, item.message].filter(Boolean).join(" ").toLocaleLowerCase();
      return matchesStatus && (!term || searchable.includes(term));
    });
  }, [items, query, statusFilter]);

  const newCount = items.filter((item) => item.status === "new").length;
  const contactedCount = items.filter((item) => item.status === "contacted").length;

  return (
    <section className="scroll-smooth font-body text-[#173b25]">
      <header className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#123e25] px-5 py-6 text-white shadow-[0_18px_48px_rgba(20,60,34,.16)] sm:px-8 sm:py-8">
        <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 -z-10 size-72 rounded-full border border-white/10" />
        <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-16 -z-10 size-56 rounded-full border border-white/[.07]" />
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="mb-2 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.22em] text-[#bbdf79]"><ClipboardList size={14} aria-hidden="true" /> Admin workspace · Inbox</p>
            <h1 className="font-heading text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Enquiry <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="italic text-[#b8df57]">inbox</span></h1>
            <span aria-hidden="true" className="mt-3 block h-[2px] w-14 rounded-full bg-gradient-to-r from-[#9bd23a] to-transparent" />
            <p className="mt-3 text-sm leading-6 text-[#e0eadb] sm:text-base">Search, review and update messages sent through your website.</p>
          </div>
          <button type="button" onClick={() => void loadItems()} disabled={loading} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 bg-white/[.08] px-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[.14] disabled:opacity-60"><RefreshCw size={15} className={loading ? "animate-spin" : ""} aria-hidden="true" /> Refresh</button>
        </div>

        {error && <p role="alert" className="mt-5 rounded-xl border border-red-200/30 bg-red-950/20 px-4 py-3 text-sm text-red-100">{error}</p>}

        <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
          <KpiImageCard label="All enquiries" value={items.length} hint="All website submissions" image={productPhoto} Icon={MessageCircle} delay={80} onClick={() => focusInbox("all")} actionLabel="Show all enquiries" selected={statusFilter === "all"} />
          <KpiImageCard label="Needs follow-up" value={newCount} hint="Awaiting first response" image={partnerPhoto} Icon={ClipboardList} delay={150} onClick={() => focusInbox("new")} actionLabel="Show new enquiries" selected={statusFilter === "new"} />
          <KpiImageCard label="Contacted" value={contactedCount} hint="Follow-up already started" image={enquiryPhoto} Icon={CheckCheck} delay={220} onClick={() => focusInbox("contacted")} actionLabel="Show contacted enquiries" selected={statusFilter === "contacted"} />
        </div>
      </header>

      <div id="enquiry-list" className="admin-dashboard-panel mt-6 scroll-mt-6 overflow-hidden rounded-[1.45rem] border border-[#e1e8dc] bg-white shadow-[0_12px_36px_rgba(27,58,34,.055)] sm:mt-7 sm:rounded-[1.7rem]">
        <div className="flex flex-col gap-4 border-b border-[#e6ebdf] px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.19em] text-[#72934c]">Find a submission</p>
            <h2 className="mt-1 font-heading text-xl font-semibold text-[#153b25]">Search enquiries</h2>
            <span aria-hidden="true" className="mt-2 block h-px w-12 bg-[#8dbb56]" />
            <p className="mt-2 text-xs text-[#849082]">{loading ? "Loading enquiries…" : `Showing ${visibleItems.length} of ${items.length} submissions`}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-[minmax(250px,1fr)_190px] lg:w-[min(100%,720px)]">
            <label className="relative">
              <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#82917c]" aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, phone, email or message…" className="min-h-11 w-full rounded-full border border-[#e1e8dc] bg-[#fbfcf8] pl-10 pr-4 text-sm text-[#173b25] outline-none transition placeholder:text-[#9aa497] focus:border-[#91bc65] focus:ring-4 focus:ring-[#91bc65]/10" />
            </label>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter enquiries by status" className="min-h-11 rounded-full border border-[#e1e8dc] bg-[#fbfcf8] px-4 text-sm text-[#49604c] outline-none focus:border-[#91bc65] focus:ring-4 focus:ring-[#91bc65]/10"><option value="all">All statuses</option><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select>
          </div>
        </div>
        {error && <p role="alert" className="mx-4 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-5">{error}</p>}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-[#f6f8f1] text-[10px] font-extrabold uppercase tracking-[.12em] text-[#73836d]"><tr><th className="px-4 py-3.5 sm:px-5">Contact</th><th className="px-4 py-3.5">Enquiry</th><th className="px-4 py-3.5">Received</th><th className="px-4 py-3.5 sm:px-5">Status</th></tr></thead>
            <tbody>
              {visibleItems.map((item) => {
                const status = item.status || "new";
                return (
                  <tr key={item.id} className="border-t border-[#edf0e9] align-top transition-colors hover:bg-[#fbfcf8]">
                    <td className="px-4 py-4 sm:px-5"><p className="font-bold text-[#203f2a]">{item.name}</p><a href={`tel:${item.phone}`} className="mt-1.5 flex items-center gap-2 text-xs text-[#657365] transition hover:text-[#28733a]"><Phone size={12} className="text-[#6f9f51]" aria-hidden="true" />{item.phone}</a>{item.email ? <a href={`mailto:${item.email}`} className="mt-1 flex items-center gap-2 text-xs text-[#657365] transition hover:text-[#28733a]"><Mail size={12} className="shrink-0 text-[#6f9f51]" aria-hidden="true" /><span className="max-w-[210px] truncate">{item.email}</span></a> : <span className="mt-1 block text-xs text-[#9aa497]">No email</span>}</td>
                    <td className="max-w-[600px] px-4 py-4"><p className="text-xs font-bold text-[#31543a]">{item.subject || "Website enquiry"}</p><p className="mt-1.5 whitespace-pre-line text-sm leading-6 text-[#627063]">{item.message}</p></td>
                    <td className="whitespace-nowrap px-4 py-4 text-xs text-[#687768]">{new Date(item.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    <td className="px-4 py-4 sm:px-5"><select value={status} disabled={updatingId === item.id} onChange={(event) => void updateStatus(item.id, event.target.value)} className={`rounded-full border px-3 py-2 text-xs font-bold capitalize outline-none transition focus:ring-4 focus:ring-[#91bc65]/10 disabled:opacity-60 ${statusStyles[status] ?? statusStyles.new}`} aria-label={`Status for ${item.name}`}><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></td>
                  </tr>
                );
              })}
              {!loading && visibleItems.length === 0 && <tr><td colSpan={4} className="px-5 py-14 text-center"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#eff6e7] text-[#4a8c35]"><Search size={21} aria-hidden="true" /></span><p className="mt-3 font-heading text-lg font-semibold text-[#284a32]">No enquiries found</p><p className="mt-1 text-sm text-[#879285]">Try another search or status filter.</p></td></tr>}
              {loading && <tr><td colSpan={4} className="px-5 py-10 text-center text-sm text-[#829080]">Loading enquiries…</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-3 border-t border-[#edf0e9] px-4 py-3 sm:px-5"><span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#dce7d5] to-transparent" /><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#96a18f]">Save Eco Organic · Enquiry desk</p><span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#dce7d5] to-transparent" /></div>
      </div>
    </section>
  );
}
