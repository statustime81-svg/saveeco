import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  Mail,
  Phone,
  RefreshCw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import enquiryInboxBg from "../../assets/admin-dashboard/enquiry-inbox-bg.png";

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

type StatusFilter = "all" | "new" | "contacted" | "closed";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function EnquiryLeads() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  async function loadItems(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    const client = supabase;

    if (!client) {
      setError("Supabase is not configured. Add the project URL and anon key.");
      setLoading(false);
      setRefreshing(false);
      return;
    }

    const { data, error: loadError } = await client
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (loadError) {
      setError(loadError.message);
    } else {
      setError("");
      setItems((data ?? []) as Enquiry[]);
    }

    setLoading(false);
    setRefreshing(false);
  }

  async function updateStatus(id: string, status: string) {
    const client = supabase;

    if (!client) {
      setError("Supabase is not configured. Add the project URL and anon key.");
      return;
    }

    setUpdatingId(id);
    setError("");

    const { error: updateError } = await client
      .from("enquiries")
      .update({ status })
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setItems((current) =>
        current.map((item) => (item.id === id ? { ...item, status } : item)),
      );
    }

    setUpdatingId(null);
  }

  useEffect(() => {
    void loadItems();
  }, []);

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesStatus =
        statusFilter === "all" || item.status?.toLowerCase() === statusFilter;
      const searchableText = [
        item.name,
        item.email,
        item.phone,
        item.subject,
        item.message,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && (!term || searchableText.includes(term));
    });
  }, [items, search, statusFilter]);

  const newCount = items.filter((item) => item.status?.toLowerCase() === "new").length;
  const contactedCount = items.filter((item) => item.status?.toLowerCase() === "contacted").length;

  return (
    <section className="mx-auto max-w-[1480px] font-body">
      <div className="relative isolate overflow-hidden rounded-[1.65rem] bg-[#123f26] px-5 py-6 text-white shadow-[0_16px_42px_rgba(19,63,38,.16)] sm:px-7 sm:py-7">
        <img
          src={enquiryInboxBg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(11,48,27,.92)_0%,rgba(13,55,31,.82)_48%,rgba(13,55,31,.63)_100%)]"
        />
        <span aria-hidden="true" className="pointer-events-none absolute -right-14 -top-28 z-[2] size-72 rounded-full border border-white/10" />
        <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-20 z-[2] size-52 rounded-full border border-white/[.07]" />

        <div className="relative z-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="inline-flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-[.2em] text-[#b8df89]">
              <ClipboardList size={15} aria-hidden="true" /> Admin workspace · Inbox
            </p>
            <h1 className="mt-2 text-3xl leading-tight tracking-[-.04em] sm:text-4xl">
              <span className="text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600 }}>Enquiry </span>
              <span className="italic text-[#a8d65a]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>inbox</span>
            </h1>
            <p className="mt-2 text-sm text-[#d9e9d8]">Search, review and update messages sent through your website.</p>
          </div>

          <button
            type="button"
            onClick={() => void loadItems(true)}
            disabled={loading || refreshing}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15 disabled:cursor-wait disabled:opacity-60"
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} aria-hidden="true" />
            Refresh
          </button>
        </div>

        <div className="relative z-10 mt-6 grid gap-2.5 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/[.07] px-4 py-3">
            <p className="text-[.62rem] font-bold uppercase tracking-[.16em] text-[#b8d2b2]">All enquiries</p>
            <p className="mt-1 font-heading text-2xl font-semibold text-white">{loading ? "…" : items.length}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[.07] px-4 py-3">
            <p className="text-[.62rem] font-bold uppercase tracking-[.16em] text-[#b8d2b2]">Needs follow-up</p>
            <p className="mt-1 font-heading text-2xl font-semibold text-[#c7ed75]">{loading ? "…" : newCount}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[.07] px-4 py-3">
            <p className="text-[.62rem] font-bold uppercase tracking-[.16em] text-[#b8d2b2]">Contacted</p>
            <p className="mt-1 font-heading text-2xl font-semibold text-white">{loading ? "…" : contactedCount}</p>
          </div>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 rounded-[1.4rem] border border-[#e5ebdf] bg-white p-4 shadow-[0_8px_26px_rgba(31,62,37,.045)] sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#7a965f]">Find a submission</p>
            <h2 className="mt-1 font-heading text-xl font-semibold text-[#173b25]">Search enquiries</h2>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-[minmax(260px,1fr)_190px] lg:w-[min(100%,560px)]">
            <label className="relative block">
              <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78906f]" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Name, phone, email or message…"
                className="min-h-11 w-full rounded-xl border border-[#dfe8d7] bg-[#fbfcf8] pl-10 pr-10 text-sm text-[#24462e] outline-none transition placeholder:text-[#9aa593] focus:border-[#85b85b] focus:bg-white focus:ring-4 focus:ring-[#4abd00]/10"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-[#72816e] transition hover:bg-[#eaf4e2] hover:text-[#28652c]"
                >
                  <X size={15} />
                </button>
              )}
            </label>

            <label className="relative block">
              <SlidersHorizontal size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78906f]" aria-hidden="true" />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
                className="min-h-11 w-full appearance-none rounded-xl border border-[#dfe8d7] bg-[#fbfcf8] pl-10 pr-9 text-sm font-medium text-[#34513a] outline-none transition focus:border-[#85b85b] focus:ring-4 focus:ring-[#4abd00]/10"
                aria-label="Filter enquiries by status"
              >
                <option value="all">All statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
              <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#78906f]" aria-hidden="true" />
            </label>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#edf0e8] pt-3">
          <p className="text-xs text-[#758273]">
            Showing <span className="font-bold text-[#315f35]">{loading ? "…" : filteredItems.length}</span> of {loading ? "…" : items.length} submissions
          </p>
          {(search || statusFilter !== "all") && (
            <button
              type="button"
              onClick={() => { setSearch(""); setStatusFilter("all"); }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4b7d38] transition hover:text-[#2c6428]"
            >
              <X size={13} /> Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-[1.4rem] border border-[#e3eadd] bg-white shadow-[0_10px_30px_rgba(31,62,37,.05)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-[#f4f8ef] text-[.68rem] font-bold uppercase tracking-[.13em] text-[#718269]">
              <tr>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Enquiry</th>
                <th className="px-5 py-4">Received</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#edf1e9]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="group transition-colors hover:bg-[#fbfcf8]">
                  <td className="px-5 py-4 align-top">
                    <p className="font-semibold text-[#203f29]">{item.name}</p>
                    <a href={`tel:${item.phone}`} className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-[#667766] transition hover:text-[#367c2c]">
                      <Phone size={12} aria-hidden="true" /> {item.phone}
                    </a>
                    {item.email && (
                      <a href={`mailto:${item.email}`} className="mt-1 flex items-center gap-1.5 break-all text-xs text-[#667766] transition hover:text-[#367c2c]">
                        <Mail size={12} className="shrink-0" aria-hidden="true" /> {item.email}
                      </a>
                    )}
                  </td>
                  <td className="max-w-[430px] px-5 py-4 align-top">
                    {item.subject && <p className="font-semibold text-[#304d35]">{item.subject}</p>}
                    <p className={`${item.subject ? "mt-1" : ""} line-clamp-3 text-xs leading-5 text-[#718071]`} title={item.message}>
                      {item.message}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 align-top text-xs text-[#687869]">
                    <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} className="text-[#83a76b]" aria-hidden="true" />{formatDate(item.created_at)}</span>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <label className="relative inline-flex">
                      <select
                        value={item.status || "new"}
                        disabled={updatingId === item.id}
                        onChange={(event) => void updateStatus(item.id, event.target.value)}
                        className={`min-h-9 min-w-[132px] appearance-none rounded-full border py-1.5 pl-3 pr-8 text-xs font-bold capitalize outline-none transition focus:ring-4 focus:ring-[#4abd00]/10 disabled:cursor-wait disabled:opacity-60 ${
                          item.status === "new"
                            ? "border-[#d9eacb] bg-[#f1f8e9] text-[#42752f]"
                            : item.status === "contacted"
                              ? "border-[#d8e7de] bg-[#edf6f0] text-[#32694a]"
                              : "border-[#e5e8df] bg-[#f6f7f3] text-[#737e70]"
                        }`}
                        aria-label={`Status for ${item.name}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                      <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-current" aria-hidden="true" />
                    </label>
                    {updatingId === item.id && <span className="ml-2 inline-flex align-middle text-[#5f8f45]"><Check size={14} className="animate-pulse" /></span>}
                  </td>
                </tr>
              ))}

              {!loading && filteredItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-14 text-center">
                    <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#eef6e7] text-[#438c2d]"><Search size={20} /></span>
                    <p className="mt-3 text-sm font-semibold text-[#36563c]">{items.length ? "No matching enquiries" : "No enquiries yet"}</p>
                    <p className="mt-1 text-xs text-[#849080]">{items.length ? "Try another search term or clear the filters." : "Website contact submissions will appear here."}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="space-y-3 p-5">
            {[0, 1, 2].map((item) => <div key={item} className="h-14 animate-pulse rounded-xl bg-[#f3f6ef]" />)}
          </div>
        )}
      </div>
    </section>
  );
}
