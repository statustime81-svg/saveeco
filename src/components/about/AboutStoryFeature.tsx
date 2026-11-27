import { useEffect, useRef, useState } from "react";
import {
  Award,
  CalendarDays,
  HandHeart,
  Leaf,
  MapPin,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import farmerPortrait from "../../assets/about-farmer.png";

type Props = {
  id?: string;
  ctaHref?: string;
  ctaLabel?: string;
  titleAs?: "h1" | "h2";
};

const facts = [
  { icon: Award, label: "ISO 9001:2015", detail: "Certified" },
  { icon: CalendarDays, label: "Incorporated", detail: "In 2015" },
  { icon: MapPin, label: "Presence across", detail: "21 states in India" },
];

// 🔥 NAYA COUNT UP COMPONENT
function CountUp({ end, suffix = "", duration = 1500 }: { end: number; suffix?: string; duration?: number }) {
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

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      
      setCount(Math.floor(eased * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, started, duration]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutStoryFeature({
  id = "about",
  ctaHref = "/about",
  ctaLabel = "Discover More",
  titleAs = "h2",
}: Props) {
  const Heading = titleAs;

  return (
    <section
      id={id}
      className="relative isolate overflow-hidden bg-[#f8fbf2] px-5 py-16 sm:px-8 lg:py-24"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-32 -z-10 size-[26rem] rounded-full bg-[#4abd00]/[0.07] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-44 -left-40 -z-10 size-[32rem] rounded-full bg-[#4abd00]/[0.06] blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-[470px] pb-16 lg:mx-0">
          <div className="relative h-[390px] overflow-hidden rounded-t-[48%] rounded-b-[1.75rem] border-[7px] border-white bg-[#e8f1dc] shadow-[0_24px_65px_rgba(32,69,27,.13)] sm:h-[470px]">
            <img
              src={farmerPortrait}
              alt="Indian farmer working among green crops"
              className="h-full w-full object-cover object-[center_38%]"
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#102e18]/20 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>

          <div className="absolute bottom-0 left-3 right-3 grid min-h-[118px] grid-cols-2 items-center rounded-[1.5rem] border border-white/45 bg-[#4abd00] px-4 py-4 text-[#14391a] shadow-[0_18px_38px_rgba(50,126,19,.24)] sm:left-6 sm:right-6 sm:min-h-[136px] sm:px-7">
            <div className="flex items-center gap-3 border-r border-[#173e1d]/20 pr-3 sm:gap-4 sm:pr-5">
              <MapPin
                className="hidden size-9 shrink-0 sm:block"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <div>
                <p className="font-heading text-3xl font-bold leading-none sm:text-4xl">
                  {/* 🔥 Yahan CountUp laga diya hai */}
                  <CountUp end={21} suffix="+" />
                </p>
                <p className="mt-1.5 text-[.62rem] font-bold uppercase tracking-[.16em] sm:text-xs">
                  States Network
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-4 sm:gap-4 sm:pl-5">
              <UsersRound
                className="hidden size-9 shrink-0 sm:block"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <div>
                <p className="font-heading text-3xl font-bold leading-none sm:text-4xl">
                  {/* 🔥 Yahan CountUp laga diya hai */}
                  <CountUp end={1300} suffix="+" />
                </p>
                <p className="mt-1.5 text-[.62rem] font-bold uppercase tracking-[.16em] sm:text-xs">
                  Channel Partners
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[680px]">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-[#287a10] sm:text-sm">
            <span className="h-[2px] w-8 bg-[#4abd00]" />
            About Save Eco
            <span className="h-[2px] w-8 bg-[#4abd00]/45" />
          </p>

          <Heading className="mt-5 max-w-[680px] font-semibold leading-[1.02] tracking-[-.045em]">
            <span className="saveeco-title-main block text-[clamp(2.5rem,4.2vw,3.8rem)]">
              One Step Towards a
            </span>
            <span className="saveeco-title-accent mt-1 block text-[clamp(2.2rem,3.7vw,3.35rem)]">
              Better Eco System
            </span>
          </Heading>

          <p className="mt-5 max-w-[650px] text-[.98rem] leading-7 text-[#536153] sm:text-[1.04rem] sm:leading-8">
            Save Eco is an ISO 9001:2015 certified company, incorporated in
            2015, with a presence across 21 states in India. Thousands of
            associate workers connect farmers with organic techniques and help
            move our vision forward.
          </p>

          <div className="mt-7 grid grid-cols-3 border-y border-[#dce8d1] py-5">
            {facts.map(({ icon: Icon, label, detail }, index) => (
              <div
                key={label}
                className={`flex flex-col gap-2 px-2 sm:flex-row sm:items-center sm:gap-3 sm:px-4 ${
                  index > 0 ? "border-l border-[#dce8d1]" : "pl-0"
                }`}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eaf5df] text-[#317d18] sm:size-10">
                  <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="text-[.63rem] font-bold leading-[1.35] text-[#22452a] sm:text-xs">
                  <span className="block">{label}</span>
                  <span className="block">{detail}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#eaf5df] text-[#3e9b18]">
                <Leaf size={23} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <p className="font-heading text-lg font-semibold leading-tight text-[#194326] sm:text-xl">
                100% Organic
                <br />
                Products
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#eaf5df] text-[#3e9b18]">
                <HandHeart size={23} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <p className="font-heading text-lg font-semibold leading-tight text-[#194326] sm:text-xl">
                Made with
                <br />
                Love &amp; Care
              </p>
            </div>
          </div>

          <Link
            to={ctaHref}
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#4abd00] px-7 py-3 text-sm font-bold text-[#14391a] shadow-[0_10px_24px_rgba(74,189,0,.2)] transition hover:-translate-y-0.5 hover:bg-[#40a900] hover:shadow-[0_14px_28px_rgba(74,189,0,.27)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245f1d]"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}