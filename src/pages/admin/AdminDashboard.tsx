import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ClipboardList,
  Image as ImageIcon,
  MessageCircle,
  Package,
  Sprout,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import farmHero from "../../assets/admin-dashboard/admin-farm-hero.webp";
import productsBg from "../../assets/admin-dashboard/admin-products-card.webp";
import enquiriesBg from "../../assets/admin-dashboard/admin-enquiries-card.webp";
import partnersBg from "../../assets/admin-dashboard/admin-partners-card.webp";
import galleryBg from "../../assets/admin-dashboard/admin-gallery-card.webp";

type Counts = { products: number; enquiries: number; partners: number; gallery: number };
type WeekCounts = Counts;
type ProductRow = { id: string; name_en: string; created_at: string };
type EnquiryRow = { id: string; name: string; subject: string | null; created_at: string };
type PartnerRow = { id: string; name: string; firm_name: string | null; created_at: string };
type GalleryRow = { id: string; title_en: string | null; created_at: string };
type ActivityRow = { id: string; title: string; detail: string; created_at: string; route: string; kind: string };
type ProductDay = { key: string; day: string; date: string; count: number };

const emptyCounts: Counts = { products: 0, enquiries: 0, partners: 0, gallery: 0 };

function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active || target <= 0) {
      setValue(0);
      return;
    }

    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(target * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, active, duration]);

  return value;
}

function CountUp({ value, loading, delay = 0 }: { value: number; loading: boolean; delay?: number }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (loading) {
      setActive(false);
      return;
    }
    const timer = window.setTimeout(() => setActive(true), delay);
    return () => window.clearTimeout(timer);
  }, [loading, delay]);

  const current = useCountUp(value, active);

  return <>{loading ? "…" : current}</>;
}

function getDayKey(value: Date) {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
}

function formatActivityDate(value: string) {
  const date = new Date(value);
  const today = new Date();
  if (getDayKey(date) === getDayKey(today)) {
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  }
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (getDayKey(date) === getDayKey(yesterday)) return "Yesterday";
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function ProductWeekChart({ data, loading }: { data: ProductDay[]; loading: boolean }) {
  const peak = Math.max(5, ...data.map((item) => item.count));
  const scale = Math.ceil(peak / 5) * 5;
  const chartTop = 27;
  const chartHeight = 148;
  const baseline = chartTop + chartHeight;
  const slot = 700 / Math.max(data.length, 1);

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-[#eee6d5] bg-[#fffdf8]/90 px-2 pt-2 sm:px-4">
      <svg viewBox="0 0 760 235" className="h-[205px] w-full sm:h-[225px]" role="img" aria-label="Products added each day over the last seven days">
        {[0, 1, 2, 3, 4].map((line) => {
          const value = Math.round((scale / 4) * line);
          const y = baseline - (value / scale) * chartHeight;
          return (
            <g key={line}>
              <line x1="43" x2="748" y1={y} y2={y} stroke="#e9e4d7" strokeDasharray={line === 0 ? "0" : "3 5"} />
              <text x="32" y={y + 4} textAnchor="end" fill="#78816f" fontSize="10" fontFamily="Manrope, sans-serif">{value}</text>
            </g>
          );
        })}
        {data.map((item, index) => {
          const center = 48 + slot * index + slot / 2;
          const height = item.count ? Math.max(5, (item.count / scale) * chartHeight) : 0;
          const barWidth = Math.min(48, slot * 0.53);
          return (
            <g key={item.key}>
              <rect x={center - barWidth / 2} y={baseline - height} width={barWidth} height={height} rx="7" fill="url(#admin-green-bar)" className="admin-chart-bar" style={{ animationDelay: `${index * 55}ms` }} />
              {item.count > 0 && <text x={center} y={baseline - height - 7} textAnchor="middle" fill="#254c2c" fontSize="11" fontWeight="700" fontFamily="Manrope, sans-serif">{item.count}</text>}
              <text x={center} y="201" textAnchor="middle" fill="#5f6d5a" fontSize="11" fontWeight="600" fontFamily="Manrope, sans-serif">{item.day}</text>
              <text x={center} y="216" textAnchor="middle" fill="#929681" fontSize="9" fontFamily="Manrope, sans-serif">{item.date}</text>
            </g>
          );
        })}
        <defs>
          <linearGradient id="admin-green-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6aa51e" />
            <stop offset="100%" stopColor="#357d22" />
          </linearGradient>
        </defs>
        {loading && <text x="380" y="105" textAnchor="middle" fill="#6e7f68" fontSize="13" fontFamily="Manrope, sans-serif">Loading weekly data…</text>}
      </svg>
    </div>
  );
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>(emptyCounts);
  const [weekCounts, setWeekCounts] = useState<WeekCounts>(emptyCounts);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryRow[]>([]);
  const [partners, setPartners] = useState<PartnerRow[]>([]);
  const [gallery, setGallery] = useState<GalleryRow[]>([]);
  const [productDates, setProductDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      if (!supabase) {
        setError("Supabase is not configured. Add the project URL and anon key.");
        setLoading(false);
        return;
      }

      const since = new Date();
      since.setHours(0, 0, 0, 0);
      since.setDate(since.getDate() - 6);
      const sinceIso = since.toISOString();

      const [
        productsTotal,
        enquiriesTotal,
        partnersTotal,
        galleryTotal,
        recentProducts,
        recentEnquiries,
        recentPartners,
        recentGallery,
        productsWeek,
        enquiriesWeek,
        partnersWeek,
        galleryWeek,
      ] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("enquiries").select("id", { count: "exact", head: true }),
        supabase.from("partner_leads").select("id", { count: "exact", head: true }),
        supabase.from("gallery_items").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id,name_en,created_at").order("created_at", { ascending: false }).limit(2),
        supabase.from("enquiries").select("id,name,subject,created_at").order("created_at", { ascending: false }).limit(2),
        supabase.from("partner_leads").select("id,name,firm_name,created_at").order("created_at", { ascending: false }).limit(2),
        supabase.from("gallery_items").select("id,title_en,created_at").order("created_at", { ascending: false }).limit(2),
        supabase.from("products").select("created_at").gte("created_at", sinceIso),
        supabase.from("enquiries").select("created_at").gte("created_at", sinceIso),
        supabase.from("partner_leads").select("created_at").gte("created_at", sinceIso),
        supabase.from("gallery_items").select("created_at").gte("created_at", sinceIso),
      ]);

      if (!active) return;

      const firstError = [productsTotal, enquiriesTotal, partnersTotal, galleryTotal, recentProducts, recentEnquiries, recentPartners, recentGallery, productsWeek, enquiriesWeek, partnersWeek, galleryWeek].find((result) => result.error)?.error;
      if (firstError) setError(firstError.message);
      else setError("");

      setCounts({
        products: productsTotal.count ?? 0,
        enquiries: enquiriesTotal.count ?? 0,
        partners: partnersTotal.count ?? 0,
        gallery: galleryTotal.count ?? 0,
      });
      setProducts((recentProducts.data ?? []) as ProductRow[]);
      setEnquiries((recentEnquiries.data ?? []) as EnquiryRow[]);
      setPartners((recentPartners.data ?? []) as PartnerRow[]);
      setGallery((recentGallery.data ?? []) as GalleryRow[]);
      setProductDates((productsWeek.data ?? []).map((row) => row.created_at));
      setWeekCounts({
        products: productsWeek.data?.length ?? 0,
        enquiries: enquiriesWeek.data?.length ?? 0,
        partners: partnersWeek.data?.length ?? 0,
        gallery: galleryWeek.data?.length ?? 0,
      });
      setLoading(false);
    }

    void loadDashboard();
    return () => { active = false; };
  }, []);

  const chartData = useMemo(() => {
    const days: ProductDay[] = [];
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - offset);
      const key = getDayKey(date);
      const count = productDates.filter((stamp) => getDayKey(new Date(stamp)) === key).length;
      days.push({
        key,
        day: date.toLocaleDateString("en-IN", { weekday: "short" }),
        date: date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
        count,
      });
    }
    return days;
  }, [productDates]);

  const activity = useMemo<ActivityRow[]>(() => [
    ...products.map((item) => ({ id: item.id, title: "New product added", detail: item.name_en, created_at: item.created_at, route: "/admin/products", kind: "product" })),
    ...enquiries.map((item) => ({ id: item.id, title: "New enquiry received", detail: item.subject || `Message from ${item.name}`, created_at: item.created_at, route: "/admin/enquiries", kind: "enquiry" })),
    ...partners.map((item) => ({ id: item.id, title: "Partner lead submitted", detail: item.firm_name || item.name, created_at: item.created_at, route: "/admin/partners", kind: "partner" })),
    ...gallery.map((item) => ({ id: item.id, title: "Gallery updated", detail: item.title_en || "New farm photo added", created_at: item.created_at, route: "/admin/gallery", kind: "gallery" })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 4), [products, enquiries, partners, gallery]);

  const cards = [
    { label: "Products", value: counts.products, weekly: weekCounts.products, icon: Package, to: "/admin/products", image: productsBg },
    { label: "Enquiries", value: counts.enquiries, weekly: weekCounts.enquiries, icon: MessageCircle, to: "/admin/enquiries", image: enquiriesBg },
    { label: "Partner Leads", value: counts.partners, weekly: weekCounts.partners, icon: UsersRound, to: "/admin/partners", image: partnersBg },
    { label: "Gallery", value: counts.gallery, weekly: weekCounts.gallery, icon: ImageIcon, to: "/admin/gallery", image: galleryBg },
  ];

  function activityIcon(kind: string) {
    if (kind === "product") return <Package size={18} aria-hidden="true" />;
    if (kind === "enquiry") return <MessageCircle size={18} aria-hidden="true" />;
    if (kind === "partner") return <UsersRound size={18} aria-hidden="true" />;
    return <ImageIcon size={18} aria-hidden="true" />;
  }

  return (
    <section className="admin-dashboard mx-auto max-w-[1600px] space-y-4 sm:space-y-5">
      <div className="admin-dashboard-hero grid overflow-hidden rounded-[1.45rem] border border-[#e8e0cb] bg-[#faf5e8] shadow-[0_13px_35px_rgba(37,63,35,.08)] md:min-h-[255px] md:grid-cols-[.78fr_1.22fr]">
        <div className="relative isolate flex flex-col items-start justify-center overflow-hidden px-5 py-5 sm:px-7 sm:py-6 lg:px-8">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 right-0 -z-10 text-[#76a64b]/20"><Sprout size={150} strokeWidth={0.75} /></div>
          <p className="inline-flex items-center gap-2 text-[.62rem] font-extrabold uppercase tracking-[.19em] text-[#667f46] sm:text-[.68rem]">
            <Sprout size={15} className="text-[#4a9b21]" aria-hidden="true" /> Save Eco Organic
            <span className="ml-2 h-px w-10 bg-[#8cab68]" />
          </p>
          <h1 className="mt-2.5 text-[clamp(1.8rem,2.65vw,2.65rem)] leading-[.98] tracking-[-.05em]">
            <span className="block text-[#143b20]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600 }}>Welcome back,</span>
            <span className="block italic text-[#568f24]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>Admin.</span>
          </h1>
          <p className="mt-2 max-w-[400px] font-heading text-[.95rem] italic leading-tight text-[#344b36] sm:text-base">Grow organic. Empower people.<br />Regenerate our earth.</p>
          <p className="mt-2 max-w-[410px] text-[.72rem] leading-5 text-[#64715e] sm:text-xs">Manage products, respond to enquiries, connect with partner leads and showcase life across your organic farms.</p>
          <Link to="/admin/products" className="admin-button group mt-3 inline-flex min-h-9 items-center gap-3 rounded-full bg-[#2f7a12] px-5 text-xs font-bold text-white shadow-[0_8px_18px_rgba(47,122,18,.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a9016] hover:shadow-[0_12px_25px_rgba(47,122,18,.27)] sm:text-sm">
            Manage Products <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="admin-hero-photo group relative min-h-[215px] overflow-hidden md:min-h-[255px]">
          <img src={farmHero} alt="Farmer tending fresh organic crops" loading="lazy" className="absolute inset-0 size-full object-cover object-[center_43%] transition-transform duration-700 group-hover:scale-[1.035]" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#183c20]/65 via-[#153b20]/15 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex max-w-[54%] flex-col justify-center px-5 py-6 text-white sm:px-8">
            <p className="text-[.62rem] font-bold uppercase tracking-[.21em] text-[#d9efad]">Daily operations</p>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-[1.05] tracking-[-.025em] sm:text-3xl">Farm to<br />admin control</h2>
            <ul className="mt-4 space-y-2 text-xs font-medium text-white/95 sm:text-sm">
              <li className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded-full bg-[#8fc52e] text-[#143b20]">✓</span>Products updated</li>
              <li className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded-full bg-[#8fc52e] text-[#143b20]">✓</span>Enquiries in progress</li>
              <li className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded-full bg-[#8fc52e] text-[#143b20]">✓</span>Partner leads active</li>
            </ul>
          </div>
          <span aria-hidden="true" className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#a8d638] via-[#4abd00] to-transparent" />
        </div>
      </div>

      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">Dashboard data could not be loaded: {error}</p>}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, weekly, icon: Icon, to, image }, index) => (
          <Link
            key={label}
            to={to}
            className="admin-dashboard-kpi group relative isolate flex min-h-[132px] overflow-hidden rounded-[1.2rem] border border-white/90 bg-[#f5efdf] p-4 shadow-[0_8px_22px_rgba(39,61,36,.11)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(39,61,36,.18)] sm:min-h-[145px] sm:p-4"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <img src={image} alt="" aria-hidden="true" loading="lazy" className="admin-dashboard-kpi-photo absolute inset-0 -z-20 size-full object-cover object-center" />
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#fff9e9]/95 via-[#fff9e9]/82 to-[#fff9e9]/10 transition duration-500 group-hover:from-[#fff9e9]/91 group-hover:via-[#fff9e9]/70" />
            <div className="relative z-10 flex w-full flex-col justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-full border border-white/80 bg-[#f7f4e7]/90 text-[#173b25] shadow-sm transition duration-300 group-hover:rotate-[-5deg] group-hover:scale-110">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="font-heading text-base font-semibold text-[#183b25] sm:text-lg">{label}</span>
              </div>
              <div className="flex items-end justify-between gap-2">
                <span className="font-heading text-[2.6rem] font-semibold leading-[.9] tracking-[-.05em] text-[#173b25] sm:text-5xl">
                  <CountUp value={value} loading={loading} delay={index * 90} />
                </span>
                <span className="mb-1 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white/75 px-2.5 py-1 text-[.68rem] font-bold text-[#397d1e] shadow-sm sm:text-xs">
                  <TrendingUp size={13} aria-hidden="true" /> +<CountUp value={weekly} loading={loading} delay={index * 90 + 150} /> this week
                </span>
              </div>
              <span className="absolute bottom-0 right-0 flex translate-y-1 items-center gap-1 text-[.68rem] font-bold text-[#356c27] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">Open {label} <ArrowUpRight size={13} /></span>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.18fr_.82fr]">
        <article className="admin-dashboard-panel min-w-0 rounded-[1.35rem] border border-[#ebe4d5] bg-[#fffdf8]/95 p-4 shadow-[0_8px_24px_rgba(39,61,36,.07)] sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[.6rem] font-extrabold uppercase tracking-[.17em] text-[#79915d]">Products added (last 7 days)</p>
              <h2 className="mt-1 font-heading text-xl font-semibold tracking-[-.025em] text-[#173b25] sm:text-2xl">Weekly performance</h2>
            </div>
            <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[#e3dcc9] bg-[#faf6eb] px-3 text-[.68rem] font-semibold text-[#647153]"><CalendarDays size={14} /> This week</span>
          </div>
          <ProductWeekChart data={chartData} loading={loading} />
        </article>

        <article className="admin-dashboard-panel overflow-hidden rounded-[1.35rem] border border-[#ebe4d5] bg-[#fffdf8]/95 shadow-[0_8px_24px_rgba(39,61,36,.07)]">
          <div className="flex items-center justify-between gap-3 border-b border-[#ede7d9] px-4 py-4 sm:px-5">
            <div>
              <p className="text-[.6rem] font-extrabold uppercase tracking-[.17em] text-[#79915d]">Live from your site</p>
              <h2 className="mt-1 font-heading text-xl font-semibold tracking-[-.025em] text-[#173b25] sm:text-2xl">Activity timeline</h2>
            </div>
            <Link to="/admin/enquiries" className="group inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#397d1e] transition hover:text-[#4abd00]">View all <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
          </div>

          {loading ? (
            <div className="space-y-3 p-5">{[0, 1, 2, 3].map((item) => <div key={item} className="h-12 animate-pulse rounded-lg bg-[#f4f3e9]" />)}</div>
          ) : activity.length ? (
            <ul className="divide-y divide-[#efe9dc] px-4 sm:px-5">
              {activity.map((item) => (
                <li key={`${item.kind}-${item.id}`}>
                    <Link to={item.route} className="admin-activity-row group flex min-h-[58px] items-center gap-3 py-2 transition hover:translate-x-0.5" style={{ animationDelay: `${activity.indexOf(item) * 65}ms` }}>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eef2d7] text-[#254b2b] transition group-hover:bg-[#dcebbd]">{activityIcon(item.kind)}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-bold text-[#203d27] sm:text-sm">{item.title}</span>
                      <span className="mt-0.5 block truncate text-[.68rem] text-[#75806d]">{item.detail}</span>
                    </span>
                    <span className="shrink-0 text-[.62rem] text-[#7c806f] sm:text-xs">{formatActivityDate(item.created_at)}</span>
                    <ArrowUpRight size={14} className="shrink-0 text-[#8da173] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-5 py-10 text-center">
              <span className="mx-auto grid size-10 place-items-center rounded-full bg-[#eef2d7] text-[#4b7f2b]"><ClipboardList size={18} /></span>
              <p className="mt-2 text-sm font-semibold text-[#36563c]">No recent activity yet</p>
              <p className="mt-1 text-xs text-[#849080]">New products, enquiries, partners and gallery items will appear here.</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 border-t border-[#ede7d9] bg-[#faf7ee] p-3 sm:grid-cols-4">
            <Link to="/admin/products" className="admin-quick-link"><Package size={14} /> Add product</Link>
            <Link to="/admin/enquiries" className="admin-quick-link"><MessageCircle size={14} /> View enquiries</Link>
            <Link to="/admin/partners" className="admin-quick-link"><UsersRound size={14} /> Partner leads</Link>
            <Link to="/admin/gallery" className="admin-quick-link"><ImageIcon size={14} /> Manage gallery</Link>
          </div>
        </article>
      </div>
    </section>
  );
}