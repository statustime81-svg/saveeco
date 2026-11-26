import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Image as ImageIcon, Leaf, Play, X } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import TopBar from "../components/layout/TopBar";
import { useContent } from "../hooks/useContent";
import SEOHead from "../lib/seo";
import galleryHero from "../assets/about-hero-farm.png";

type GalleryItem = {
  id: string;
  title_en?: string | null;
  image_url: string;
  video_url?: string | null;
  media_type?: "photo" | "video";
  category?: string | null;
};

type GalleryTab = "photos" | "videos";

function isVideo(item: GalleryItem) {
  return item.media_type === "video" || Boolean(item.video_url);
}

export default function Gallery() {
  const [tab, setTab] = useState<GalleryTab>("photos");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { data = [], isLoading, isError } =
    useContent<GalleryItem>("gallery_items");

  const items = useMemo(
    () => data.filter((item) => (tab === "videos" ? isVideo(item) : !isVideo(item))),
    [data, tab],
  );
  const selected = selectedIndex === null ? null : items[selectedIndex] ?? null;

  const showPrevious = () => {
    if (selectedIndex === null || items.length < 2) return;
    setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
  };

  const showNext = () => {
    if (selectedIndex === null || items.length < 2) return;
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected, selectedIndex, items.length]);
  const galleryGridColumns =
    items.length === 1
      ? "lg:grid-cols-1"
      : items.length === 2
        ? "lg:grid-cols-2"
        : "lg:grid-cols-3";
  const galleryGridWidth =
    items.length === 1
      ? "max-w-[900px] mx-auto"
      : items.length === 2
        ? "max-w-[1080px] mx-auto"
        : "";

  return (
    <>
      <SEOHead
        title="Gallery"
        description="See Save Eco Organic activities, products, and community moments."
        path="/gallery"
      />
      <TopBar />
      <Navbar />

      <main className="gallery-page overflow-hidden bg-[#fbfaf5] font-body">
        <section
          className="gallery-hero relative isolate flex min-h-[350px] items-center justify-center bg-cover bg-center px-5 py-14 text-center sm:min-h-[390px] sm:px-8 lg:min-h-[430px]"
          style={{ backgroundImage: `url(${galleryHero})` }}
          aria-labelledby="gallery-title"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,38,20,.58),rgba(10,38,20,.36)_48%,rgba(8,32,16,.58)),linear-gradient(0deg,rgba(8,35,18,.48),transparent_68%)]"
          />
          <div className="gallery-hero-copy relative z-10 mx-auto w-full max-w-[820px] text-white">
            <nav aria-label="Breadcrumb" className="mb-7 text-xs font-medium text-white/80 sm:text-sm">
              <Link to="/" className="transition hover:text-white">Home</Link>
              <span className="mx-2.5 text-[#c1dc8c]">/</span>
              <span aria-current="page">Gallery</span>
            </nav>
            <p className="inline-flex items-center gap-3 text-[.68rem] font-bold uppercase tracking-[.24em] text-[#d2ed9a] sm:text-xs">
              <span className="h-px w-9 bg-[#a9d64c] sm:w-12" />
              Save Eco Community
              <span className="h-px w-9 bg-[#a9d64c] sm:w-12" />
            </p>
            <h1
              id="gallery-title"
              className="mt-3 text-[clamp(3rem,8vw,5.6rem)] leading-[.95] tracking-[-.045em]"
            >
              <span className="saveeco-title-main !text-white">Our</span>{" "}
              <span className="saveeco-title-accent !text-[#d5ef9b]">Gallery</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[650px] text-sm leading-6 text-white/90 sm:text-base sm:leading-7">
              Photos and videos from our work with farmers, partners, and communities.
            </p>
          </div>
        </section>

        <section className="gallery-content relative z-10 mx-auto -mt-8 max-w-[1320px] rounded-t-[2rem] bg-[#fbfaf5] px-5 pb-14 pt-5 shadow-[0_-14px_38px_rgba(24,50,27,.08)] sm:-mt-10 sm:px-8 sm:pt-6 lg:px-12 lg:pb-20">
          <div className="gallery-tabs mx-auto mb-8 flex w-fit items-center gap-1.5 rounded-full border border-[#e8ebdf] bg-white p-1.5 shadow-[0_8px_24px_rgba(28,58,32,.09)] sm:mb-10">
            {(["photos", "videos"] as const).map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={tab === item}
                onClick={() => setTab(item)}
                className={`inline-flex min-h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold capitalize transition duration-300 sm:px-6 ${
                  tab === item
                    ? "bg-[#49bf00] text-[#15391f] shadow-[0_5px_14px_rgba(73,191,0,.2)]"
                    : "bg-[#f0f5e8] text-[#315f36] hover:bg-[#e4efd8]"
                }`}
              >
                {item === "photos" ? <ImageIcon size={15} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                {item}
              </button>
            ))}
          </div>

          {isLoading && (
            <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 lg:auto-rows-[220px] lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className={`animate-pulse rounded-[1.25rem] bg-[#e9efe1] ${item === 0 ? "col-span-2 row-span-2" : ""}`}
                />
              ))}
            </div>
          )}

          {isError && (
            <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
              Gallery load nahi ho paayi. Database connection check karke dobara try karein.
            </div>
          )}

          {!isLoading && !isError && items.length === 0 && (
            <div className="mx-auto max-w-xl rounded-[1.5rem] border border-[#e5eadc] bg-white px-6 py-12 text-center shadow-[0_12px_36px_rgba(30,60,34,.06)] sm:py-16">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#edf5e2] text-[#3f852d]">
                {tab === "photos" ? <ImageIcon size={24} /> : <Play size={22} />}
              </span>
              <h2 className="mt-4 text-xl">
                <span className="saveeco-title-main">No {tab}</span>{" "}
                <span className="saveeco-title-accent">published yet</span>
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#667264]">
                Add and publish {tab} from the admin panel. They will appear here automatically.
              </p>
            </div>
          )}

          {!isLoading && !isError && items.length > 0 && (
            <div className={`gallery-grid grid auto-rows-[180px] grid-cols-1 gap-4 sm:auto-rows-[210px] sm:grid-cols-2 sm:gap-5 lg:auto-rows-[250px] ${galleryGridColumns} ${galleryGridWidth}`}>
              {items.map((item, index) => {
                const video = isVideo(item);
                const featured = index === 0 && items.length > 2;
                const prominent = featured || items.length <= 2;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`${video ? "Play" : "View"} ${item.title_en || (video ? "gallery video" : "gallery photo")}`}
                    style={{ animationDelay: `${index * 90}ms` }}
                    className={`gallery-reveal gallery-tile group relative isolate overflow-hidden rounded-[1.4rem] border border-white/80 bg-[#e7efdf] text-left shadow-[0_14px_34px_rgba(20,48,25,.12)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_52px_rgba(20,48,25,.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4abd00] sm:rounded-[1.8rem] ${
                      featured ? "col-span-2 row-span-2" : ""
                    }`}
                  >
                    <img
                      src={item.image_url}
                      alt={item.title_en || "Save Eco Organic community gallery"}
                      loading="lazy"
                      className="gallery-tile-image absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 group-hover:scale-[1.07]"
                    />
                    <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#082315]/95 via-[#0b2112]/15 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
                    {video && (
                      <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-full border border-white/50 bg-white/20 text-white shadow-lg backdrop-blur-md sm:left-5 sm:top-5 sm:size-12">
                        <Play size={17} fill="currentColor" aria-hidden="true" />
                      </span>
                    )}
                    <span className="absolute right-4 top-4 grid size-10 translate-y-1 place-items-center rounded-full border border-white/45 bg-[#f7fff0]/20 text-white opacity-0 shadow-lg backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:right-5 sm:top-5">
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </span>
                    <span className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white sm:p-5 ${prominent ? "sm:p-7" : ""}`}>
                      <span className="min-w-0">
                        {item.category && (
                          <span className="mb-2 inline-flex rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.16em] text-[#d5ef9b] backdrop-blur-md sm:text-[10px]">
                            {item.category}
                          </span>
                        )}
                        <span className={`block line-clamp-2 font-heading font-semibold leading-tight tracking-[-.02em] ${prominent ? "text-xl sm:text-2xl" : "text-sm sm:text-lg"}`}>
                          {item.title_en || (video ? "Watch community story" : "Save Eco community")}
                        </span>
                      </span>
                      <span className="mb-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[.12em] text-white/90 backdrop-blur-md sm:text-[10px]">
                        {video ? <Play size={12} fill="currentColor" aria-hidden="true" /> : <Leaf size={13} className="text-[#c8e88a]" aria-hidden="true" />}
                        {video ? "Video" : "Photo"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {selected && selectedIndex !== null && (
        <div
          className="gallery-lightbox fixed inset-0 z-[100] flex h-[100dvh] w-screen flex-col overflow-hidden bg-[#07150c]/[.98] p-3 text-white sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title_en || "Gallery media"}
          onClick={() => setSelectedIndex(null)}
        >
          <div className="relative z-20 flex shrink-0 items-start justify-between gap-4 px-1 pb-3 sm:px-2 sm:pb-4">
            <div className="min-w-0 max-w-[min(75vw,620px)] rounded-2xl border border-white/15 bg-white/[.08] px-4 py-3 backdrop-blur-md sm:px-5">
              <p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#c8e88a] sm:text-[10px]">
                Save Eco Organic · {isVideo(selected) ? "Video" : "Photo"}
              </p>
              <p aria-live="polite" className="mt-1 truncate font-heading text-base font-semibold leading-tight sm:text-xl">
                {selected.title_en || "Community moments"}
              </p>
              <p className="mt-1 text-xs text-white/65">
                {String(selectedIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close gallery media"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/[.08] text-white backdrop-blur-md transition hover:rotate-90 hover:bg-[#4abd00] hover:text-[#123b22] sm:size-12"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={21} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-1 pb-2 sm:px-14">
            {items.length > 1 && (
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(event) => { event.stopPropagation(); showPrevious(); }}
                className="absolute left-0 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-[#102c1c]/80 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-[#4abd00] hover:text-[#123b22] sm:left-2 sm:size-12"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {isVideo(selected) ? (
              <video
                src={selected.video_url || selected.image_url}
                poster={selected.image_url}
                controls
                autoPlay
                className="max-h-full max-w-full rounded-xl object-contain shadow-[0_20px_70px_rgba(0,0,0,.4)]"
                onClick={(event) => event.stopPropagation()}
              />
            ) : (
              <img
                key={selected.id}
                src={selected.image_url}
                alt={selected.title_en || "Save Eco Organic gallery"}
                className="max-h-full max-w-full rounded-xl object-contain shadow-[0_20px_70px_rgba(0,0,0,.4)]"
                onClick={(event) => event.stopPropagation()}
              />
            )}

            {items.length > 1 && (
              <button
                type="button"
                aria-label="Next photo"
                onClick={(event) => { event.stopPropagation(); showNext(); }}
                className="absolute right-0 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-[#102c1c]/80 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-[#4abd00] hover:text-[#123b22] sm:right-2 sm:size-12"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          <div className="flex shrink-0 items-center justify-center gap-2 pt-2 sm:pt-3" aria-label="Gallery navigation">
            {items.length > 1 && items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show photo ${index + 1}: ${item.title_en || "Gallery image"}`}
                aria-current={index === selectedIndex ? "true" : undefined}
                onClick={(event) => { event.stopPropagation(); setSelectedIndex(index); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? "w-8 bg-[#a9d64c]" : "w-2 bg-white/35 hover:bg-white/70"}`}
              />
            ))}
            <p className="sr-only">Use the left and right arrow keys to browse photos. Press Escape to close.</p>
          </div>
        </div>
      )}
    </>
  );
}
