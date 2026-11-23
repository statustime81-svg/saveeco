import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Play, X } from "lucide-react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import TopBar from "../components/layout/TopBar";
import { useContent } from "../hooks/useContent";
import SEOHead from "../lib/seo";

type GalleryItem = { id: string; title_en?: string | null; image_url: string; video_url?: string | null; media_type?: "photo" | "video"; category?: string | null };

export default function Gallery() {
  const [tab, setTab] = useState<"photos" | "videos">("photos");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const { data = [], isLoading, isError } = useContent<GalleryItem>("gallery_items");
  const items = useMemo(() => data.filter((item) => tab === "videos" ? item.media_type === "video" || Boolean(item.video_url) : item.media_type !== "video" && !item.video_url), [data, tab]);
  return <>
    <SEOHead title="Gallery" description="See Save Eco Organic activities, products, and community moments." path="/gallery" />
    <TopBar /><Navbar />
    <main>
      <section className="bg-primary-light px-5 py-14 sm:px-8"><div className="mx-auto max-w-site"><nav className="text-sm text-muted"><Link to="/">Home</Link><span className="mx-2">/</span>Gallery</nav><p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-primary">Save Eco community</p><h1 className="mt-2 font-heading text-4xl font-semibold text-ink">Gallery</h1><p className="mt-3 max-w-2xl text-muted">Photos and videos from our work with farmers, partners, and communities.</p></div></section>
      <section className="mx-auto max-w-site px-5 py-12 sm:px-8 lg:py-16">
        <div className="mb-7 flex gap-2" role="tablist" aria-label="Gallery type">{(["photos", "videos"] as const).map((item) => <button key={item} type="button" role="tab" aria-selected={tab === item} onClick={() => setTab(item)} className={`rounded-full px-5 py-2 text-sm font-semibold capitalize ${tab === item ? "bg-primary text-white" : "bg-primary-light text-primary-dark"}`}>{item}</button>)}</div>
        {isLoading && <p className="text-muted">Loading gallery…</p>}{isError && <p role="alert" className="rounded-lg bg-red-50 p-4 text-danger">Gallery could not be loaded. Check the database connection.</p>}
        {!isLoading && !isError && items.length === 0 && <div className="rounded-xl bg-cream p-8 text-center text-muted">No {tab} have been published yet.</div>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <button key={item.id} type="button" onClick={() => setSelected(item)} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-primary-light text-left"><img src={item.image_url} alt={item.title_en || "Save Eco Organic gallery"} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />{tab === "videos" && <span className="absolute inset-0 grid place-items-center bg-black/20 text-white"><Play fill="currentColor" size={44} /></span>}<span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-12 text-sm font-semibold text-white">{item.title_en || (tab === "videos" ? "Watch video" : "Save Eco Organic")}</span></button>)}</div>
      </section>
    </main><Footer />
    {selected && <div className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4" role="dialog" aria-modal="true" onClick={() => setSelected(null)}><button type="button" aria-label="Close gallery" className="absolute right-5 top-5 text-white"><X /></button>{selected.media_type === "video" || selected.video_url ? <video src={selected.video_url || selected.image_url} controls autoPlay className="max-h-[85vh] max-w-[90vw]" onClick={(event) => event.stopPropagation()} /> : <img src={selected.image_url} alt={selected.title_en || "Save Eco Organic"} className="max-h-[85vh] max-w-[90vw] object-contain" onClick={(event) => event.stopPropagation()} />}</div>}
  </>;
}
