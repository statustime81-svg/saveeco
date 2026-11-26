import { ArrowRight, BadgeCheck, Handshake, Leaf, Store } from "lucide-react";

const headingFont = "var(--font-heading, 'Playfair Display', Georgia, serif)";
const accentFont = "'Cormorant Garamond', Georgia, serif";
const bodyFont = "var(--font-body, 'Manrope', Arial, sans-serif)";

const partnerPaths = [
  {
    number: "01",
    title: "Direct Partner",
    label: "Direct partner registration",
    description:
      "Register directly as a Save Eco Organic partner and explore the direct partnership process.",
    points: [
      "Direct partner registration link",
      "Company and product information",
      "Contact details for assistance",
    ],
    button: "Join as Direct Partner",
    href: "https://app.saveeco.in/join_now/",
    icon: BadgeCheck,
    featured: true,
  },
  {
    number: "02",
    title: "Channel Partner",
    label: "Partner enquiry route",
    description:
      "Share your business details through the Channel Partner enquiry process.",
    points: [
      "Channel partner enquiry path",
      "Firm and contact details collection",
      "Enquiry review by the company team",
    ],
    button: "Explore Channel Partner",
    href: "https://app.saveeco.in/login",
    icon: Store,
    featured: false,
  },
];

export default function JoinPreview() {
  return (
    <section
      id="partner-options"
      style={{ fontFamily: bodyFont }}
      className="relative isolate overflow-hidden bg-[#f6faee] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-16 -z-10 size-[28rem] rounded-full bg-[#4abd00]/[0.08] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-[12%] -z-10 size-[30rem] rounded-full bg-[#b7d991]/[0.2] blur-3xl"
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 250 220"
        fill="none"
        className="pointer-events-none absolute -right-8 -top-8 -z-10 hidden w-56 text-[#41732d]/25 sm:block lg:w-64"
      >
        <path
          d="M240 10C193 37 166 70 135 109c-25 31-52 56-97 85"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M197 39c-25-19-47-23-69-19 10 21 30 33 56 32"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M169 74c-26-14-49-14-70-5 14 19 35 27 60 21"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M137 111c-27-7-48-1-66 13 17 15 39 18 63 7"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1fr_1fr] lg:items-center lg:gap-6">
          <div className="max-w-[440px]">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#d8e8c7] bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#24552d]">
              <Handshake size={16} aria-hidden="true" />
              Join Save Eco
            </p>

            <h2
              style={{ fontFamily: headingFont }}
              className="mt-5 text-[2.6rem] font-semibold leading-[.98] tracking-[-.045em] text-[#143b20] sm:text-5xl lg:text-[3.8rem]"
            >
              Choose your
              <br />
              partner{" "}
              <span
                style={{
                  fontFamily: accentFont,
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "#4a8c20",
                  letterSpacing: "-.045em",
                }}
              >
                path
              </span>
            </h2>

            <span
              aria-hidden="true"
              className="mt-5 block h-[3px] w-16 rounded-full bg-[#4abd00]"
            />

            <p className="mt-5 max-w-[410px] text-base leading-7 text-[#4e5b50]">
              Direct and Channel Partner routes have separate registration
              processes. Choose the option that fits your partnership enquiry.
            </p>

            <div className="mt-5 flex items-center gap-3 text-sm font-medium text-[#315c35]">
              <span className="grid size-9 place-items-center rounded-full bg-[#e4f1d8] text-[#3b8b20]">
                <Leaf size={18} aria-hidden="true" />
              </span>
              <span>Grow with Save Eco Organic</span>
            </div>
          </div>

          {partnerPaths.map((partner) => {
            const Icon = partner.icon;

            return (
              <article
                key={partner.number}
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white/90 p-4 shadow-[0_10px_28px_rgba(24,62,31,.07)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(24,62,31,.13)] sm:p-5 ${
                  partner.featured
                    ? "border-[#9aca67] ring-1 ring-[#4abd00]/25"
                    : "border-[#dce7d4] hover:border-[#9aca67]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-[#4abd00]/[0.07] blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#4abd00]/[0.14]"
                />

                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-1.5 ${
                    partner.featured
                      ? "bg-[#4abd00]"
                      : "bg-gradient-to-r from-[#c9dfad] via-[#4abd00] to-[#c9dfad] opacity-70"
                  }`}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <span
                    className={`grid size-12 place-items-center rounded-xl transition-all duration-500 group-hover:rotate-[-5deg] group-hover:scale-105 ${
                      partner.featured
                        ? "bg-[#eaf6dc] text-[#27721f] group-hover:bg-[#4abd00] group-hover:text-white"
                        : "bg-[#f0f6e9] text-[#356d2c] group-hover:bg-[#e4f2d7]"
                    }`}
                  >
                    <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                  </span>

                  <span
                    style={{ fontFamily: headingFont }}
                    className="text-2xl font-semibold leading-none text-[#c5d7b4] transition-colors duration-300 group-hover:text-[#77b92d]"
                  >
                    {partner.number}
                  </span>
                </div>

                <p className="relative mt-3 inline-flex w-fit rounded-full bg-[#eff6e7] px-3 py-1 text-[11px] font-semibold text-[#376c2b]">
                  {partner.label}
                </p>

                <h3
                  style={{ fontFamily: headingFont }}
                  className="relative mt-2 text-xl font-semibold leading-tight text-[#143b20] sm:text-2xl"
                >
                  {partner.title}
                </h3>

                <p className="relative mt-2 text-[13px] leading-5 text-[#536153] sm:text-sm">
                  {partner.description}
                </p>

                <ul className="relative mt-3 space-y-1.5 border-t border-[#e3eadc] pt-3">
                  {partner.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs leading-5 text-[#304735] sm:text-[13px]"
                    >
                      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-[#e6f4d7] text-[#3b8b20] transition-colors group-hover:bg-[#d8edc3]">
                        <span className="text-[10px] font-bold" aria-hidden="true">
                          ✓
                        </span>
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={partner.href}
                  className={`group/button relative mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#245f1d] sm:text-sm ${
                    partner.featured
                      ? "bg-[#4abd00] text-[#143b20] shadow-[0_7px_16px_rgba(74,189,0,.18)] hover:bg-[#43ad00] hover:shadow-[0_10px_20px_rgba(74,189,0,.27)]"
                      : "border border-[#4a8c40] bg-white text-[#24552d] hover:border-[#4abd00] hover:bg-[#eff7e7]"
                  }`}
                >
                  {partner.button}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover/button:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
