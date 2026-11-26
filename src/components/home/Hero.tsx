import { useEffect, useState } from "react";
import { ArrowRight, Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useContent } from "../../hooks/useContent";

const AUTOPLAY_DELAY = 6500;

type Banner = {
  id: string;
  title_en?: string | null;
  title_hi?: string | null;
  subtitle_en?: string | null;
  subtitle_hi?: string | null;
  image_url: string;
  link_url?: string | null;
};

function localized(valueEn?: string | null, valueHi?: string | null, isHindi = false) {
  return (isHindi ? valueHi?.trim() || valueEn?.trim() : valueEn?.trim() || valueHi?.trim()) || "";
}

export default function Hero() {
  const { i18n } = useTranslation();
  const { data: banners = [], isLoading, isError } = useContent<Banner>("banners");
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isHindi = (i18n.resolvedLanguage ?? i18n.language).toLowerCase().startsWith("hi");

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (activeIndex >= banners.length) setActiveIndex(0);
  }, [activeIndex, banners.length]);

  useEffect(() => {
    if (reducedMotion || banners.length < 2) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % banners.length);
    }, AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [activeIndex, banners.length, reducedMotion]);

  if (isLoading) {
    return (
      <section className="saveeco-hero-slider" aria-busy="true" aria-label="Loading homepage banner">
        <div className="saveeco-hero-slider__skeleton" />
      </section>
    );
  }

  // Never substitute sample banners: only active records from the admin are shown.
  if (isError || banners.length === 0) return null;

  const active = banners[activeIndex] ?? banners[0];
  const title = localized(active.title_en, active.title_hi, isHindi);
  const subtitle = localized(active.subtitle_en, active.subtitle_hi, isHindi);
  const titleWords = title.trim().split(/\s+/).filter(Boolean);
  const titleSplitAt = Math.max(1, Math.ceil(titleWords.length / 2));
  const titleFirstPart = titleWords.slice(0, titleSplitAt).join(" ");
  const titleSecondPart = titleWords.slice(titleSplitAt).join(" ");
  const previewBanners = Array.from(
    { length: Math.min(3, Math.max(0, banners.length - 1)) },
    (_, offset) => banners[(activeIndex + offset + 1) % banners.length],
  );

  return (
    <section
      id="home"
      className="saveeco-hero-slider"
      aria-roledescription={banners.length > 1 ? "carousel" : undefined}
      aria-label="Save Eco homepage banners"
    >
      <div className="saveeco-hero-slider__backgrounds" aria-hidden="true">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`saveeco-hero-slider__background ${index === activeIndex ? "is-active" : ""}`}
          >
            <img
              src={banner.image_url}
              alt=""
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === activeIndex ? "high" : "auto"}
            />
          </div>
        ))}
      </div>

      <div className="saveeco-hero-slider__shade" aria-hidden="true" />

      <div className="saveeco-hero-slider__content">
        <div className="saveeco-hero-slider__copy" key={`copy-${active.id}`}>
          <p className="saveeco-hero-slider__eyebrow">
            <span><Leaf size={15} aria-hidden="true" /></span>
            Save Eco Organic
          </p>
          {title && (
            <h1 className={`saveeco-hero-slider__title ${isHindi ? "is-hindi" : ""}`}>
              {isHindi ? title : <>
                <span className="saveeco-hero-slider__title-primary">{titleFirstPart}</span>
                {titleSecondPart && <span className="saveeco-hero-slider__title-accent">{titleSecondPart}</span>}
              </>}
            </h1>
          )}
          {subtitle && <p className="saveeco-hero-slider__description">{subtitle}</p>}
        </div>

        {previewBanners.length > 0 && (
          <div className="saveeco-hero-slider__preview-area" aria-label={isHindi ? "अन्य बैनर" : "Other banners"}>
            <div className="saveeco-hero-slider__preview-cards">
              {previewBanners.map((banner) => {
                const bannerTitle = localized(banner.title_en, banner.title_hi, isHindi) || "Save Eco Organic";
                const bannerSubtitle = localized(banner.subtitle_en, banner.subtitle_hi, isHindi);
                const bannerIndex = banners.findIndex((item) => item.id === banner.id);
                return (
                  <button
                    key={banner.id}
                    type="button"
                    className="saveeco-hero-slider__preview-card"
                    onClick={() => setActiveIndex(bannerIndex)}
                    aria-label={`${isHindi ? "बैनर दिखाएँ" : "Show banner"}: ${bannerTitle}`}
                    aria-current={bannerIndex === activeIndex ? "true" : undefined}
                  >
                    <img src={banner.image_url} alt="" loading="lazy" />
                    <span className="saveeco-hero-slider__preview-shade" aria-hidden="true" />
                    <span className="saveeco-hero-slider__preview-copy">
                      <span className="saveeco-hero-slider__preview-title">{bannerTitle}</span>
                      {bannerSubtitle && <span className="saveeco-hero-slider__preview-subtitle">{bannerSubtitle}</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {banners.length > 1 && (
          <nav className="saveeco-hero-slider__pagination" aria-label={isHindi ? "बैनर स्लाइड चुनें" : "Choose banner slide"}>
            {banners.map((banner, index) => {
              const bannerTitle = localized(banner.title_en, banner.title_hi, isHindi) || `Banner ${index + 1}`;
              return (
                <button
                  key={banner.id}
                  type="button"
                  className={`saveeco-hero-slider__pagination-item${index === activeIndex ? " is-active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${isHindi ? "बैनर दिखाएँ" : "Show banner"}: ${bannerTitle}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                >
                  <span className="saveeco-hero-slider__pagination-track">
                    <span className="saveeco-hero-slider__pagination-progress" key={`${banner.id}-${index === activeIndex}`} />
                  </span>
                </button>
              );
            })}
          </nav>
        )}

        <a href={active.link_url || "/products"} className="saveeco-hero-slider__cta">
          {isHindi ? "उत्पाद देखें" : "Explore products"}
          <ArrowRight size={17} aria-hidden="true" />
        </a>

      </div>
    </section>
  );
}
