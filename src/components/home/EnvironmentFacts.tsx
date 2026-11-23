import {
  CalendarDays,
  Handshake,
  MapPinned,
  Sprout,
} from "lucide-react";
import commitmentBg from "../../assets/commitment-bg.png";

const commitments = [
  {
    number: "01",
    title: "Sustainable farming",
    description: "Supporting organic techniques",
    icon: Sprout,
  },
  {
    number: "02",
    title: "Ethical sourcing",
    description: "Supporting responsible practices",
    icon: Handshake,
  },
  {
    number: "03",
    title: "Established",
    description: "Company incorporated in 2015",
    icon: CalendarDays,
  },
  {
    number: "04",
    title: "States network",
    description: "Network across 21 states",
    icon: MapPinned,
  },
];

export default function EnvironmentFacts() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f8fbf2] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <img
        src={commitmentBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      <div className="absolute inset-0 -z-10 bg-[#f8fbf2]/85" />

      <div className="mx-auto grid max-w-[1280px] items-center gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
        <div className="max-w-[430px]">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#dce9c8] bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.17em] text-[#32662b] sm:text-xs">
            <Sprout size={15} aria-hidden="true" />
            Our commitment
          </p>

          <h2 className="mt-5 font-heading text-4xl font-semibold leading-[1.02] tracking-[-.035em] text-[#143b20] sm:text-5xl lg:text-[3.5rem]">
            Dedicated to a healthier environment
          </h2>

          <span className="mt-5 block h-[2px] w-16 rounded-full bg-[#4abd00]" />

          <p className="mt-5 max-w-[390px] text-sm leading-6 text-[#4e5b50] sm:text-base sm:leading-7">
            We support organic techniques and responsible practices for a
            cleaner, greener tomorrow.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-white/80 bg-white/65 p-4 shadow-[0_16px_45px_rgba(24,62,31,.1)] backdrop-blur-md sm:p-6">
          <div className="space-y-2.5">
            {commitments.map(({ number, title, description, icon: Icon }) => (
              <article
                key={number}
                className="group grid grid-cols-[42px_48px_1fr] items-center gap-3 rounded-xl border border-[#e5ebdd] bg-white/70 px-3 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-[#a9cf76] hover:shadow-md sm:grid-cols-[48px_54px_1fr] sm:gap-4 sm:px-4"
              >
                <span className="font-heading text-xl font-semibold text-[#77aa42] sm:text-2xl">
                  {number}
                </span>

                <span className="grid size-10 place-items-center rounded-full bg-[#eaf4dc] text-[#347d25] transition duration-300 group-hover:bg-[#4abd00] group-hover:text-white sm:size-12">
                  <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                </span>

                <div className="border-l border-[#dce8cf] pl-3 sm:pl-4">
                  <h3 className="font-heading text-base font-semibold leading-tight text-[#143b20] sm:text-lg">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#536153] sm:text-sm">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}