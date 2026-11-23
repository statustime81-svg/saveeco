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
      className="relative isolate overflow-hidden bg-[#f8fbf2] px-5 py-12 sm:px-8 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[28rem] rounded-full bg-[#4abd00]/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-[28rem] rounded-full bg-[#4abd00]/[0.06] blur-3xl"
      />

      <div className="mx-auto grid max-w-[1320px] items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
        <div className="relative mx-auto w-full max-w-[470px] pb-14 lg:mx-0">
          <div className="relative h-[360px] overflow-hidden rounded-t-[48%] rounded-b-[2rem] border-[6px] border-white bg-[#e9f1dd] shadow-[0_24px_65px_rgba(20,63,32,.14)] sm:h-[450px]">
            <img
              src={farmerPortrait}
              alt="Indian farmer in a green field"
              className="h-full w-full object-cover object-[center_38%]"
              loading="lazy"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#143b20]/20 via-transparent to-transparent"
            />
          </div>

          <div className="absolute bottom-0 left-3 right-3 grid min-h-[104px] grid-cols-2 items-center rounded-[1.5rem] border border-white/50 bg-[#4abd00] px-4 py-4 text-[#143b20] shadow-[0_18px_38px_rgba(50,126,19,.22)] sm:left-6 sm:right-6 sm:min-h-[120px] sm:px-6">
            <div className="flex items-center gap-3 border-r border-[#143b20]/20 pr-3 sm:gap-4 sm:pr-5">
              <MapPin
                className="hidden size-8 shrink-0 sm:block"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <div>
                <p className="font-heading text-3xl font-bold leading-none sm:text-4xl">
                  21+
                </p>
                <p className="mt-2 text-[.62rem] font-bold uppercase tracking-[.14em] sm:text-xs">
                  States Network
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-4 sm:gap-4 sm:pl-5">
              <UsersRound
                className="hidden size-8 shrink-0 sm:block"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <div>
                <p className="font-heading text-3xl font-bold leading-none sm:text-4xl">
                  1300+
                </p>
                <p className="mt-2 text-[.62rem] font-bold uppercase tracking-[.14em] sm:text-xs">
                  Channel Partners
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[720px]">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-[#4abd00] sm:text-sm">
            <span className="h-[2px] w-8 bg-[#4abd00]" />
            About Save Eco
            <span className="h-[2px] w-8 bg-[#4abd00]/45" />
          </p>

          <Heading className="mt-4 max-w-[680px] font-heading font-semibold leading-[1.02] tracking-[-.035em] text-[#143b20]">
            <span className="block text-[clamp(2.5rem,4.2vw,3.8rem)]">
              One Step Towards a
            </span>
            <span className="mt-1 block text-[clamp(2.2rem,3.7vw,3.35rem)] text-[#4a8c20]">
              Better Eco System
            </span>
          </Heading>

          <p className="mt-5 max-w-[680px] text-[.95rem] leading-7 text-[#536153] sm:text-base sm:leading-7">
            Save Eco is an ISO 9001:2015 certified company, incorporated in
            2015, with a presence across 21 states in India. Thousands of
            associate workers connect farmers with organic techniques and help
            move our vision forward.
          </p>

          <div className="mt-7 grid grid-cols-3 border-y border-[#dce8d1] py-4">
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
                <span className="text-[.62rem] font-bold leading-snug text-[#22452a] sm:text-xs">
                  <span className="block">{label}</span>
                  <span className="block">{detail}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eaf5df] text-[#3e9b18] sm:size-12">
                <Leaf size={23} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <p className="font-heading text-lg font-semibold leading-tight text-[#143b20] sm:text-xl">
                100% Organic
                <br />
                Products
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eaf5df] text-[#3e9b18] sm:size-12">
                <HandHeart size={23} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <p className="font-heading text-lg font-semibold leading-tight text-[#143b20] sm:text-xl">
                Made with
                <br />
                Love &amp; Care
              </p>
            </div>
          </div>

          <Link
            to={ctaHref}
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#4abd00] px-7 py-3 text-sm font-bold text-[#143b20] shadow-[0_10px_24px_rgba(74,189,0,.2)] transition hover:-translate-y-0.5 hover:bg-[#43ad00] hover:shadow-[0_14px_28px_rgba(74,189,0,.27)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245f1d]"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}