import {
  FlaskConical,
  HandHeart,
  HeartPulse,
  Leaf,
  Recycle,
  Search,
  Sprout,
} from "lucide-react";

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
      className="relative isolate overflow-hidden bg-[#f8fbf2] px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      {/* Subtle botanical corner details */}
      <Sprout
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 -top-10 -z-10 size-40 -rotate-45 text-[#78915c]/20 sm:size-52"
        strokeWidth={0.8}
      />
      <Sprout
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-14 -right-8 -z-10 size-44 rotate-[135deg] text-[#78915c]/20 sm:size-56"
        strokeWidth={0.8}
      />

      <div className="mx-auto max-w-[1420px]">
        <header className="mb-12 text-center sm:mb-14">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="hidden h-px w-16 bg-[#89a16d] sm:block" />

            <div className="flex items-center gap-2">
              <Sprout
                size={28}
                className="text-[#4abd00]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <span className="font-heading text-lg font-semibold text-[#143b20] sm:text-xl">
                SAVE ECO ORGANIC
              </span>
            </div>

            <span className="hidden h-px w-16 bg-[#89a16d] sm:block" />
          </div>

          <p className="text-[.65rem] font-bold uppercase tracking-[.24em] text-[#647650]">
            Our Benefits
          </p>

          <h2 className="mt-3 font-heading text-[clamp(2.35rem,4.7vw,4rem)] font-semibold leading-[1.02] tracking-[-.035em] text-[#102f1d]">
            Why choose Save Eco Organic
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-[3px] w-16 -rotate-2 rounded-full bg-[#4abd00]" />
            <Leaf
              size={22}
              className="text-[#4abd00]"
              aria-hidden="true"
            />
            <span className="h-[3px] w-16 rotate-2 rounded-full bg-[#4abd00]" />
          </div>
        </header>

        <div className="grid gap-y-9 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
          {benefits.map(({ number, title, description, Icon }, index) => (
            <article
              key={number}
              className={`flex flex-col items-center px-5 text-center sm:px-7 lg:px-5 ${
                index > 0 ? "lg:border-l lg:border-[#4abd00]/65" : ""
              }`}
            >
              <span className="font-heading text-3xl font-bold leading-none text-[#4abd00] sm:text-4xl">
                {number}
              </span>

              <span className="mt-5 grid h-[92px] w-[92px] place-items-center text-[#143b20] sm:h-[104px] sm:w-[104px]">
                <Icon
                  size={76}
                  strokeWidth={1.35}
                  aria-hidden="true"
                />
              </span>

              <h3 className="mt-4 min-h-[64px] max-w-[240px] font-heading text-2xl font-semibold leading-[1.02] tracking-[-.02em] text-[#143b20] sm:text-[1.75rem]">
                {title}
              </h3>

              <p className="mt-3 max-w-[250px] text-sm leading-6 text-[#253c2d]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}