import {
  FlaskConical,
  HandHeart,
  HeartPulse,
  Leaf,
  Recycle,
  Search,
  Sprout,
} from "lucide-react";
import benefitsBackground from "../../assets/benefits-background.png";

const benefits = [
  {
    number: "01",
    title: "Sustainability",
    description:
      "Lowering environmental impact with eco-friendly choices at every step.",
    Icon: Recycle,
  },
  {
    number: "02",
    title: "Quality Ingredients",
    description:
      "Pure, natural, and thoughtfully selected for real, lasting benefits.",
    Icon: FlaskConical,
  },
  {
    number: "03",
    title: "Ethical Sourcing",
    description:
      "Responsibly sourced from trusted partners who share our values.",
    Icon: HandHeart,
  },
  {
    number: "04",
    title: "Transparency",
    description:
      "Clear, honest information about our ingredients, processes, and impact.",
    Icon: Search,
  },
  {
    number: "05",
    title: "Healthier Lifestyle",
    description:
      "Nourishing, cleaner choices that support your long-term well-being.",
    Icon: HeartPulse,
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="benefits"
      className="relative isolate overflow-hidden bg-[#f8fbf2] px-5 py-4 sm:px-8 sm:py-5 lg:px-12 lg:py-6"
    >
      <img
        src={benefitsBackground}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-[.62]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[#f8fbf2]/30 lg:bg-gradient-to-r lg:from-transparent lg:via-[#f8fbf2]/35 lg:to-[#f8fbf2]/90"
      />

      <div className="mx-auto grid max-w-[1420px] items-center gap-6 lg:grid-cols-[.82fr_1.18fr] lg:gap-10">
        <div aria-hidden="true" className="hidden lg:block" />

        <div className="mx-auto w-full max-w-[790px] rounded-[1.5rem] bg-[#fbfcf6]/90 p-3 shadow-[0_16px_50px_rgba(21,55,30,.08)] backdrop-blur-[2px] sm:p-5 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-0">
          <header className="mb-3 text-center sm:mb-4">
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className="hidden h-px w-12 bg-[#89a16d] sm:block" />
              <div className="flex items-center gap-2">
                <Sprout
                  size={23}
                  className="text-[#4abd00]"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <span className="font-heading text-sm font-semibold tracking-[.04em] text-[#143b20] sm:text-base">
                  SAVE ECO ORGANIC
                </span>
              </div>
              <span className="hidden h-px w-12 bg-[#89a16d] sm:block" />
            </div>

            <p className="text-[.58rem] font-bold uppercase tracking-[.24em] text-[#647650]">
              Our Benefits
            </p>

            <h2 className="mt-1.5 leading-[.98] tracking-[-.035em]">
              <span className="saveeco-title-main block text-[clamp(2rem,3.4vw,3rem)]">
                Why choose
              </span>
              <span className="saveeco-title-accent block text-[clamp(1.9rem,3.2vw,2.85rem)]">
                Save Eco Organic
              </span>
            </h2>

            <div className="mx-auto mt-1.5 flex items-center justify-center gap-3">
              <span className="h-[2px] w-12 -rotate-2 rounded-full bg-[#4abd00]" />
              <Leaf size={18} className="text-[#4abd00]" aria-hidden="true" />
              <span className="h-[2px] w-12 rotate-2 rounded-full bg-[#4abd00]" />
            </div>
          </header>

          <div className="divide-y divide-[#cbd9bd]/80">
            {benefits.map(({ number, title, description, Icon }) => (
              <article
                key={number}
                className="grid grid-cols-[30px_1px_38px_minmax(0,1fr)] items-center gap-2.5 py-1.5 first:pt-1 last:pb-1 sm:grid-cols-[40px_1px_48px_minmax(0,1fr)] sm:gap-3 sm:py-2"
              >
                <span className="font-heading text-lg font-bold leading-none text-[#4abd00] sm:text-xl">
                  {number}
                </span>
                <span className="h-10 w-px bg-[#a7c787]/75" aria-hidden="true" />
                <span className="grid size-9 place-items-center text-[#143b20] sm:size-10">
                  <Icon size={29} strokeWidth={1.55} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-semibold leading-tight text-[#143b20] sm:text-lg">
                    {title}
                  </h3>
                  <p className="mt-0.5 text-[.7rem] leading-[1.35] text-[#35483a] sm:text-xs sm:leading-[1.4]">
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
