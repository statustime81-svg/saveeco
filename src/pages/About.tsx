import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  CalendarDays,
  Factory,
  HandHeart,
  Leaf,
  MapPin,
  Sunrise,
  Sprout,
} from "lucide-react";
import { Link } from "react-router-dom";
import aboutHeroFarm from "../assets/about-hero-farm.png";
import PublicPageLayout from "../components/layout/PublicPageLayout";

const companyFacts = [
  { icon: Award, value: "ISO 9001:2015", label: "Certified company" },
  { icon: CalendarDays, value: "2015", label: "Year incorporated" },
  { icon: MapPin, value: "21 states", label: "Presence across India" },
];

const trainingAreas = [
  "Product training",
  "Farmer training",
  "Leadership training",
  "Product workshops",
  "Success training seminars",
];

const productAreas = [
  { icon: Sprout, title: "Liquid organic fertilizers", detail: "For agriculture" },
  { icon: Leaf, title: "Dairy supplements", detail: "For people" },
  { icon: Factory, title: "Feed supplements", detail: "For animals" },
];

// Naya CountUp Component add kiya gaya hai
function CountUpNumber({ value }: { value: string }) {
  const match = value.match(/(\d+)/);
  if (!match) return <>{value}</>;

  const target = parseInt(match[1], 10);
  const prefix = value.slice(0, match.index);
  const suffix = value.slice((match.index || 0) + match[1].length);

  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let animationFrame: number;
    let startTime: number | null = null;
    const duration = 1500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, started]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <PublicPageLayout>
      <div className="font-body">
        <section id="about-intro" className="about-page-section relative isolate overflow-hidden bg-[#f8fbf2] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[4.5rem]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 -z-10 size-[30rem] rounded-full bg-[#cde9a7]/45 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-[-7rem] -z-10 size-[25rem] rounded-full bg-[#e4efcf]/80 blur-3xl" />
          <div className="mx-auto grid max-w-[1240px] items-center gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-10 xl:gap-16">
            <div className="relative z-10 max-w-[560px]">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#dce9c8] bg-white/80 px-3.5 py-2 text-[.64rem] font-bold uppercase tracking-[.18em] text-[#36712d] shadow-sm sm:text-xs">
                <Leaf size={15} aria-hidden="true" /> About Save Eco
              </p>
              <h1 className="mt-5 text-[clamp(2.8rem,6vw,5.4rem)] leading-[.91] tracking-[-.055em]">
                <span className="saveeco-title-main">Happy Earth,</span><br /><span className="saveeco-title-accent">Happy Us.</span>
              </h1>
              <p className="mt-5 max-w-[510px] text-xs font-bold uppercase leading-5 tracking-[.12em] text-[#4a8c20] sm:text-sm sm:leading-6">
                Protect food. Protect Earth. Protect next generations. Go organic.
              </p>
              <p className="mt-5 max-w-[540px] text-sm leading-6 text-[#4d5d4e] sm:text-base sm:leading-7">
                Save Eco is an ISO 9001:2015-certified company, incorporated in 2015, with a presence across 21 states in India. Thousands of associate workers help bridge farmers with organic techniques, and thousands of farmers support the company’s mission. Hundreds of organic farming groups across India help operations run smoothly. All Save Eco products are organically certified under APEDA.
              </p>
              <a href="#mission" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#28652c] transition-all hover:gap-3">
                Explore our story <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            <div className="about-animate-image relative mx-auto w-full max-w-[670px] pb-12 sm:pb-14 lg:pb-10">
              <div aria-hidden="true" className="absolute inset-[3%] rotate-[-5deg] rounded-[44%_30%_42%_34%] bg-[#e4f1bd]" />
              <div className="relative aspect-[1.12] overflow-hidden border-[7px] border-[#f8fbf2] shadow-[0_24px_65px_rgba(31,71,30,.18)] sm:border-[10px]" style={{ borderRadius: "46% 31% 40% 34% / 35% 38% 48% 44%" }}>
                <img src={aboutHeroFarm} alt="Sunlight over green organic farmland" className="h-full w-full object-cover object-[58%_center] transition-transform duration-700 hover:scale-[1.035]" fetchPriority="high" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#173b25]/25 via-transparent to-white/5" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-3 gap-1.5 sm:left-4 sm:right-[-.75rem] sm:gap-2 lg:left-[-4rem] lg:right-[-1rem]">
                {companyFacts.map(({ icon: Icon, value, label }) => (
                  <article key={value} style={{ animationDelay: `${companyFacts.findIndex((fact) => fact.value === value) * 90}ms` }} className="about-animate-card group flex min-h-[68px] items-center gap-2 rounded-xl border border-white/80 bg-[#fffef8]/95 px-2 py-2 shadow-[0_10px_26px_rgba(26,62,30,.12)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#b9d790] sm:min-h-[82px] sm:gap-3 sm:rounded-2xl sm:px-3.5 sm:py-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#edf6e4] text-[#347d25] sm:size-10"><Icon size={17} strokeWidth={1.7} aria-hidden="true" /></span>
                    {/* Yahan {value} ki jagah <CountUpNumber /> use kiya hai */}
                    <span className="min-w-0"><strong className="block font-heading text-[.67rem] font-semibold leading-tight text-[#143b20] sm:text-sm"><CountUpNumber value={value} /></strong><span className="mt-1 block text-[.55rem] leading-tight text-[#657363] sm:text-[.68rem]">{label}</span></span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="mission" className="scroll-mt-28 bg-white px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-[1240px]">
            <header className="mb-8 text-center sm:mb-11">
              <p className="inline-flex items-center gap-3 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#2f6828] sm:text-xs">
                <span className="h-px w-8 bg-[#7cae48] sm:w-12" /> Our Commitment <span className="h-px w-8 bg-[#7cae48] sm:w-12" />
              </p>
              <h2 className="mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-tight tracking-[-.035em]"><span className="saveeco-title-main">Mission &amp;</span> <span className="saveeco-title-accent">Vision</span></h2>
              <div className="mx-auto mt-3 flex max-w-[250px] items-center justify-center gap-3 text-[#4a8c20]">
                <span className="h-px flex-1 bg-[#315b32]" /><Leaf size={19} aria-hidden="true" /><span className="h-px flex-1 bg-[#315b32]" />
              </div>
            </header>

            <div className="grid items-center gap-8 md:grid-cols-[.82fr_1.18fr] lg:gap-12">
              <div className="about-animate-image relative mx-auto w-full max-w-[430px] p-2.5">
                <div aria-hidden="true" className="absolute inset-0 rounded-full border border-[#78a83d]" />
                <div aria-hidden="true" className="absolute inset-[7px] rounded-full border border-[#a7ca73]" />
                <div className="relative aspect-square overflow-hidden rounded-full border-[7px] border-[#fbfcf6] shadow-[0_18px_45px_rgba(22,58,29,.16)]">
                  <img src={aboutHeroFarm} alt="Sunlit green farmland" loading="lazy" className="h-full w-full object-cover object-[62%_center] transition-transform duration-700 hover:scale-105" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#143b20]/20 via-transparent to-white/5" />
                </div>
                <Leaf aria-hidden="true" className="absolute -bottom-1 right-4 size-12 rotate-[-28deg] fill-[#78a83d] text-[#78a83d] sm:right-1" strokeWidth={1.1} />
                <Leaf aria-hidden="true" className="absolute bottom-5 right-0 size-8 rotate-[18deg] fill-[#a6ca6f] text-[#a6ca6f] sm:-right-3" strokeWidth={1.1} />
              </div>

              <div className="grid gap-4">
                <article className="about-animate-card group grid grid-cols-[56px_1fr] items-center gap-4 overflow-hidden rounded-[1.4rem] bg-[#143b20] p-5 text-white shadow-[0_16px_38px_rgba(20,59,32,.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(20,59,32,.24)] sm:grid-cols-[72px_1fr] sm:gap-5 sm:rounded-[1.6rem] sm:p-7">
                  <span className="grid size-12 place-items-center border-r border-[#8bc34a]/60 pr-3 text-[#f8fbf2] sm:size-16 sm:pr-4"><HandHeart size={38} strokeWidth={1.35} aria-hidden="true" /></span>
                  <div>
                    <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#a9d83f] sm:text-xs">Mission</p>
                    <h3 className="mt-1 font-heading text-xl font-semibold leading-tight text-white sm:text-2xl lg:text-[1.75rem]">Dedicated to improving the global environment</h3>
                    <p className="mt-2 text-xs leading-5 text-[#e2ebde] sm:text-sm sm:leading-6">The mission is to help reduce CO₂ impact. People who care for humanity and nature are joining this effort.</p>
                  </div>
                </article>

                <article className="about-animate-card group grid grid-cols-[56px_1fr] items-center gap-4 overflow-hidden rounded-[1.4rem] border border-[#e5e8d8] bg-[#fffdf7] p-5 shadow-[0_12px_32px_rgba(30,57,31,.09)] transition duration-300 hover:-translate-y-1 hover:border-[#b6ce8f] hover:shadow-[0_18px_38px_rgba(30,57,31,.14)] sm:grid-cols-[72px_1fr] sm:gap-5 sm:rounded-[1.6rem] sm:p-7">
                  <span className="grid size-12 place-items-center border-r border-[#b9d88e] pr-3 text-[#3d842c] sm:size-16 sm:pr-4"><Sunrise size={38} strokeWidth={1.4} aria-hidden="true" /></span>
                  <div>
                    <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#4a8c20] sm:text-xs">Vision</p>
                    <h3 className="mt-1 font-heading text-xl font-semibold leading-tight text-[#143b20] sm:text-2xl lg:text-[1.75rem]">Bring farmers and organic practices closer</h3>
                    <p className="mt-2 text-xs leading-5 text-[#536153] sm:text-sm sm:leading-6">Thousands of farmers and associate workers help carry the company’s vision and mission forward, supported by hundreds of organic farming groups across India.</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="our-goal" className="scroll-mt-28 relative isolate overflow-hidden bg-[#f2f7e9] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-0 -z-10 size-[27rem] rounded-full bg-[#d9e9c4]/60 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 left-[-9rem] -z-10 size-[28rem] rounded-full bg-white/80 blur-3xl" />
          <div className="mx-auto max-w-[1240px]">
            <div className="grid items-end gap-6 lg:grid-cols-[.82fr_1.18fr] lg:gap-12">
              <header className="max-w-[480px]">
                <p className="inline-flex items-center gap-2 rounded-full border border-[#d9e7ca] bg-white/75 px-3.5 py-2 text-[.62rem] font-bold uppercase tracking-[.19em] text-[#39732c]">
                  <Sprout size={15} aria-hidden="true" /> Our goal
                </p>
                <h2 className="mt-5 text-[clamp(2.15rem,4.4vw,3.6rem)] leading-[1.02] tracking-[-.04em]"><span className="saveeco-title-main">Training for a</span> <span className="saveeco-title-accent">greener tomorrow</span></h2>
                <p className="mt-4 max-w-[430px] text-sm leading-7 text-[#526252] sm:text-base">
                  Training programs support farmers and non-farmer associates through practical learning, product workshops and seminars.
                </p>
              </header>

              <article className="about-animate-card relative overflow-hidden rounded-[1.6rem] border border-white/90 bg-[#fffef9] p-5 shadow-[0_18px_48px_rgba(28,63,32,.09)] sm:rounded-[1.9rem] sm:p-7">
                <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-16 size-48 rounded-full border border-[#dce9cf]" />
                <div className="relative flex items-center gap-3 border-b border-[#e6eddf] pb-4">
                  <span className="grid size-11 place-items-center rounded-full bg-[#edf6e4] text-[#347d25]"><BookOpenCheck size={21} aria-hidden="true" /></span>
                  <div>
                    <p className="text-[.58rem] font-bold uppercase tracking-[.17em] text-[#7a9b5f]">Learning &amp; development</p>
                    <h3 className="mt-0.5 font-heading text-xl font-semibold text-[#143b20] sm:text-2xl">Training and workshops</h3>
                  </div>
                </div>
                <div className="relative mt-4 grid gap-2 sm:grid-cols-2">
                  {trainingAreas.map((area, index) => (
                    <div key={area} style={{ animationDelay: `${index * 65}ms` }} className="about-animate-card group flex min-h-11 items-center gap-3 rounded-xl border border-[#edf1e8] bg-[#f8faf3] px-3.5 py-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-[#b9d391] hover:bg-white">
                      <span className="font-heading text-[.62rem] font-bold text-[#6a9f36]">0{index + 1}</span>
                      <span className="text-xs font-medium text-[#3e5341] sm:text-sm">{area}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="mt-10 sm:mt-12">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#78a83d]" />
                <p className="text-[.62rem] font-bold uppercase tracking-[.19em] text-[#477936]">Sister-concern manufacturing units</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {productAreas.map(({ icon: Icon, title, detail }, index) => (
                  <article key={title} style={{ animationDelay: `${index * 90}ms` }} className="about-animate-card group relative flex min-h-[112px] items-center gap-4 overflow-hidden rounded-[1.35rem] border border-white/90 bg-white/85 p-4 shadow-[0_10px_28px_rgba(28,63,32,.05)] transition duration-300 hover:-translate-y-1 hover:border-[#bdd79d] hover:shadow-[0_18px_36px_rgba(28,63,32,.11)] sm:p-5">
                    <span className="absolute right-3 top-1 font-heading text-5xl font-semibold leading-none text-[#edf4e5] transition-colors group-hover:text-[#e4f0d4]">0{index + 1}</span>
                    <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-[#edf6e4] text-[#347d25] transition duration-300 group-hover:rotate-[-5deg] group-hover:bg-[#e2f0d2]"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>
                    <span className="relative min-w-0"><strong className="block font-heading text-base font-semibold leading-tight text-[#173b25] sm:text-lg">{title}</strong><span className="mt-1 block text-xs text-[#697566] sm:text-sm">{detail}</span></span>
                  </article>
                ))}
              </div>
            </div>

            <div className="about-animate-card relative mt-8 flex flex-col gap-5 overflow-hidden rounded-[1.6rem] bg-[#143b20] p-5 text-white shadow-[0_18px_45px_rgba(20,59,32,.16)] sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:rounded-[1.9rem] sm:px-7 sm:py-6">
              <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-24 size-56 rounded-full border border-white/[.08]" />
              <div className="relative">
                <p className="text-[.6rem] font-bold uppercase tracking-[.19em] text-[#a8d875]">People behind the work</p>
                <h2 className="mt-1 text-2xl sm:text-3xl"><span className="saveeco-title-main !text-white">Meet the</span> <span className="saveeco-title-accent !text-[#a8d875]">Save Eco team</span></h2>
              </div>
              <Link to="/about/team" className="group relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#a8d875]/50 bg-[#4abd00] px-5 text-sm font-bold text-[#143b20] shadow-[0_8px_22px_rgba(74,189,0,.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#a9d83f]">
                View our team <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PublicPageLayout>
  );
}