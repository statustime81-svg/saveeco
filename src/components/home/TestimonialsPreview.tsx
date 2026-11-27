import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import "./TestimonialsPreview.css";
import { useContent } from "../../hooks/useContent";
import featureBackground from "../../assets/testimonial-feature-bg.png";
import sectionBackground from "../../assets/testimonials-section-bg.png";

const headingFont = "var(--font-heading, 'Playfair Display', Georgia, serif)";
const accentFont = "'Cormorant Garamond', Georgia, serif";
const bodyFont = "var(--font-body, 'Manrope', Arial, sans-serif)";

type TestimonialRow = {
  id: string;
  person_name: string;
  location: string | null;
  message_en: string;
  image_url: string | null;
  rating?: number | null;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Person({ member, compact = false }: { member: TestimonialRow; compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {member.image_url ? (
        <img
          src={member.image_url}
          alt={`${member.person_name} portrait`}
          loading="lazy"
          className={`${compact ? "size-10" : "size-12"} shrink-0 rounded-full border-2 border-white object-cover shadow-sm`}
        />
      ) : (
        <span
          aria-hidden="true"
          className={`${compact ? "size-10 text-xs" : "size-12 text-sm"} grid shrink-0 place-items-center rounded-full border-2 border-white bg-[#e8f2d8] font-semibold text-[#28652c] shadow-sm`}
        >
          {getInitials(member.person_name)}
        </span>
      )}
      <div className="min-w-0">
        <p style={{ fontFamily: headingFont }} className="truncate font-semibold text-[#173b25]">{member.person_name}</p>
        {member.location && <p className="truncate text-xs text-[#697566]">{member.location}</p>}
      </div>
    </div>
  );
}

function Rating({ rating = 5 }: { rating?: number | null }) {
  return (
    <div className="flex items-center gap-1 text-[#72aa24]" role="img" aria-label={`${rating ?? 5} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={13} fill={index < (rating ?? 5) ? "currentColor" : "none"} strokeWidth={1.7} />
      ))}
    </div>
  );
}

export default function TestimonialsPreview() {
  const { data: testimonials = [], isLoading, isError } = useContent<TestimonialRow>("testimonials");
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const total = testimonials.length;
  const currentIndex = total ? activeIndex % total : 0;
  const featured = testimonials[currentIndex];
  const supporting = total > 1
    ? Array.from({ length: Math.min(2, total - 1) }, (_, item) => testimonials[(currentIndex + item + 1) % total])
    : [];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (total < 2 || paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % total);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [total, paused, reducedMotion]);

  const goTo = (index: number) => {
    if (!total) return;
    setActiveIndex((index + total) % total);
  };

  return (
    <section
      id="testimonials"
      style={{
        fontFamily: bodyFont,
        backgroundImage: `url(${sectionBackground})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="relative isolate overflow-hidden bg-[#faf8f1] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[4.5rem]"
    >
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
          <div>
            <p className="text-[.67rem] font-bold uppercase tracking-[.2em] text-[#36712d] sm:text-xs">
              Stories from our community
            </p>
            <h2
              style={{ fontFamily: headingFont }}
              className="mt-2 text-[1.8rem] font-semibold leading-tight tracking-[-.025em] text-[#173b25] sm:text-3xl lg:text-4xl"
            >
              Farmers and partner{" "}
              <span
                style={{
                  fontFamily: accentFont,
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "#4a8c20",
                  letterSpacing: "-.045em",
                }}
              >
                experiences
              </span>
            </h2>
          </div>
          <span className="hidden items-center gap-2 pb-1 text-xs font-medium text-[#5c7056] sm:inline-flex">
            <span className="grid size-7 place-items-center rounded-full bg-white/80 text-[#458527]"><Quote size={14} /></span>
            Real voices, shared with us
          </span>
        </header>

        {isLoading && (
          <div className="grid gap-4 lg:grid-cols-[1.35fr_.8fr]">
            <div className="h-[300px] animate-pulse rounded-[1.6rem] bg-white/75 sm:h-[330px]" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[1, 2].map((item) => <div key={item} className="h-[150px] animate-pulse rounded-2xl bg-white/75" />)}
            </div>
          </div>
        )}

        {isError && (
          <p className="rounded-2xl border border-red-200 bg-red-50/90 p-4 text-sm text-red-700">
            Testimonials load nahi ho paaye. Supabase connection check karo.
          </p>
        )}

        {!isLoading && !isError && featured && (
          <div
            className={`grid gap-4 ${supporting.length ? "lg:grid-cols-[1.35fr_.8fr]" : ""}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
            }}
          >
            <article
              key={featured.id}
              className="group relative isolate flex min-h-[330px] flex-col justify-end overflow-hidden rounded-[1.6rem] border border-[#dbe3cc] bg-[#eef1df] shadow-[0_16px_42px_rgba(27,61,33,.12)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(27,61,33,.18)] sm:min-h-[350px] lg:min-h-[370px]"
            >
              <img
                src={featureBackground}
                alt=""
                aria-hidden="true"
                className="absolute left-0 top-0 z-0 h-[48%] w-full object-cover object-left transition-transform duration-700 group-hover:scale-[1.025] sm:inset-0 sm:h-full"
              />
              <div aria-hidden="true" className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-[#faf8f1]/70 to-[#faf8f1] sm:bg-gradient-to-r sm:via-[#faf8f1]/45 sm:to-[#faf8f1]/95" />

              <div className="testimonial-slide-in relative z-10 ml-auto flex w-full flex-col justify-center p-5 pt-28 sm:w-[60%] sm:p-7 lg:w-[57%] lg:p-9">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d8e7c9] bg-white/75 px-3 py-1.5 text-[.62rem] font-bold uppercase tracking-[.15em] text-[#3c702e] backdrop-blur-sm">
                    <span className="size-1.5 rounded-full bg-[#78b936]" /> Featured story
                  </span>
                  <Rating rating={featured.rating} />
                </div>

                <Quote className="mb-2 text-[#76ad32]" size={27} strokeWidth={1.5} aria-hidden="true" />
                <blockquote
                  style={{ fontFamily: headingFont }}
                  className="line-clamp-5 text-[1.25rem] font-medium leading-[1.45] text-[#173b25] sm:text-[1.45rem] lg:text-[1.7rem]"
                >
                  “{featured.message_en}”
                </blockquote>
                <div className="mt-5 border-t border-[#cbd8b7]/80 pt-4">
                  <Person member={featured} />
                </div>
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {supporting.map((testimonial, index) => (
                <article
                  key={testimonial.id}
                  className="testimonial-slide-in group relative overflow-hidden rounded-2xl border border-[#e2e6d8] bg-[#fffef9]/85 p-4 shadow-[0_9px_24px_rgba(27,61,33,.07)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#b8d391] hover:bg-white hover:shadow-[0_16px_34px_rgba(27,61,33,.12)] sm:p-5"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span style={{ fontFamily: headingFont }} className="text-2xl leading-none text-[#b6ce91]">0{index + 2}</span>
                    <Rating rating={testimonial.rating} />
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#465848] sm:text-[.94rem]">
                    “{testimonial.message_en}”
                  </p>
                  <div className="mt-4 border-t border-[#e6eadf] pt-3">
                    <Person member={testimonial} compact />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {!isLoading && !isError && total > 1 && (
          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-xs font-semibold tracking-[.12em] text-[#5c7056]">
              <span className="text-[#28652c]">{String(currentIndex + 1).padStart(2, "0")}</span>
              <span className="px-1.5 text-[#a1ad91]">/</span>
              {String(total).padStart(2, "0")} <span className="ml-1 tracking-normal">stories</span>
            </p>

            <div className="flex items-center gap-2" aria-label="Testimonial carousel controls">
              <button
                type="button"
                onClick={() => goTo(currentIndex - 1)}
                aria-label="Previous testimonial"
                className="grid size-11 place-items-center rounded-full border border-[#b9cba4] bg-white/75 text-[#245f1d] transition hover:-translate-y-0.5 hover:border-[#4abd00] hover:bg-[#eaf4dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4abd00]"
              >
                <ArrowLeft size={16} aria-hidden="true" />
              </button>

              <div className="flex items-center gap-1.5 px-1" role="tablist" aria-label="Choose a testimonial">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.id}
                    type="button"
                    role="tab"
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-selected={currentIndex === index}
                    onClick={() => goTo(index)}
                    className="group grid size-11 place-items-center rounded-full transition-transform duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4abd00]"
                  >
                    <span className={`block h-2 rounded-full border border-transparent transition-all duration-300 group-hover:w-7 group-hover:border-[#79aa45] ${currentIndex === index ? "w-7 bg-[#4abd00]" : "w-2 bg-[#b7c99d]"}`} />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(currentIndex + 1)}
                aria-label="Next testimonial"
                className="grid size-11 place-items-center rounded-full border border-[#b9cba4] bg-white/75 text-[#245f1d] transition hover:-translate-y-0.5 hover:border-[#4abd00] hover:bg-[#eaf4dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4abd00]"
              >
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {!isLoading && !isError && testimonials.length === 0 && (
          <div className="rounded-2xl border border-[#e4e8da] bg-white/80 p-5 text-sm text-[#5d6b58] shadow-sm backdrop-blur-sm">
            Admin panel me testimonial add karke “Visible on website” enable karo.
          </div>
        )}

      </div>
    </section>
  );
}
