import {
  ArrowRight,
  Check,
  ClipboardCheck,
  FileText,
  Handshake,
  Leaf,
  Sprout,
  UsersRound,
} from "lucide-react";
import PublicPageLayout from "../components/layout/PublicPageLayout";
import joinFarmHero from "../assets/about-hero-farm.png";

const steps = [
  {
    title: "Step 1",
    text: "Choose Direct Partner or Channel Partner.",
    Icon: UsersRound,
  },
  {
    title: "Step 2",
    text: "Submit the relevant registration or enquiry details.",
    Icon: ClipboardCheck,
  },
  {
    title: "Step 3",
    text: "The company reviews the submitted information and follows up.",
    Icon: FileText,
  },
];

const partnerOptions = [
  {
    number: "01",
    title: "Direct Partner",
    description:
      "Use the Direct Partner registration path and provide your contact details.",
    benefits: [
      "Direct partner registration route",
      "Access to company and product information",
      "Contact path for registration questions",
    ],
    href: "https://app.saveeco.in/join_now/",
    Icon: Sprout,
    featured: false,
  },
  {
    number: "02",
    title: "Channel Partner",
    description:
      "Submit your firm and contact information through the Channel Partner form.",
    benefits: [
      "In-site partner enquiry form",
      "Firm and location details captured",
      "Company team can review the enquiry",
    ],
    href: "https://app.saveeco.in/login",
    Icon: Handshake,
    featured: true,
  },
];

export default function Join() {
  return (
    <PublicPageLayout>
      <main className="join-page overflow-hidden bg-white font-body">
        <section
          className="join-hero relative isolate flex min-h-[350px] items-start justify-center bg-cover bg-center px-5 pb-20 pt-12 sm:min-h-[390px] sm:px-8 sm:pt-14 lg:min-h-[410px]"
          style={{ backgroundImage: `url(${joinFarmHero})` }}
          aria-labelledby="join-title"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(248,250,241,.84)_0%,rgba(248,250,241,.60)_45%,rgba(248,250,241,.13)_100%)]"
          />
          <div className="join-animate relative z-10 mx-auto w-full max-w-[900px] pt-1 text-center">
            <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.24em] text-[#245c2d] sm:text-sm">
              <span className="h-px w-9 bg-[#75b82e] sm:w-12" />
              Join Save Eco
              <span className="h-px w-9 bg-[#75b82e] sm:w-12" />
            </p>
            <h1
              id="join-title"
              className="mt-3 text-[clamp(2.65rem,6vw,4.6rem)] leading-[.98] tracking-[-.045em]"
            >
              <span className="saveeco-title-main">Become a</span>{" "}
              <span className="saveeco-title-accent">partner</span>
            </h1>
            <p className="join-animate mx-auto mt-4 max-w-[680px] text-sm leading-6 text-[#334337] sm:text-base sm:leading-7">
              Review the two partner paths and choose the one that fits your
              enquiry. This page does not make income or earning claims.
            </p>
            <span
              aria-hidden="true"
              className="mx-auto mt-5 flex items-center justify-center gap-3 text-[#347d29]"
            >
              <span className="h-px w-14 bg-[#7dbb37]" />
              <Leaf size={22} strokeWidth={1.6} />
              <span className="h-px w-14 bg-[#7dbb37]" />
            </span>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-12 max-w-[1180px] px-5 pb-8 sm:px-8 sm:pb-10">
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {partnerOptions.map(
              ({ number, title, description, benefits, href, Icon, featured }, index) => (
                <article
                  key={title}
                  style={{ animationDelay: `${index * 130}ms` }}
                  className={`join-animate group relative flex min-h-[390px] flex-col overflow-hidden rounded-[1.65rem] border p-6 shadow-[0_18px_46px_rgba(25,55,30,.14)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(25,55,30,.2)] sm:min-h-[410px] sm:p-8 ${
                    featured
                      ? "border-[#23592f] bg-[#123e25] text-white"
                      : "border-[#d9e5cf] bg-[#fffef9] text-[#173b25]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -right-8 -top-10 size-36 rounded-full border ${featured ? "border-white/10" : "border-[#dce8ce]"}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-12 -right-4 h-32 w-60 -rotate-[18deg] rounded-[50%] border-t-2 ${featured ? "border-[#91bd45]/50" : "border-[#91bd45]/40"}`}
                  />

                  <div className="relative z-10 flex items-start gap-4">
                    <span
                      className={`relative grid size-[74px] shrink-0 place-items-center rounded-[1.35rem] transition duration-500 group-hover:rotate-[-4deg] group-hover:scale-105 ${featured ? "bg-[#285b37] text-[#d5ef9b]" : "bg-[#eef5df] text-[#245f2c]"}`}
                    >
                      <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-[#a9d74a] text-[10px] font-bold text-[#183b20]">
                        {number.slice(1)}
                      </span>
                      <Icon size={38} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 pt-1">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-[.2em] ${featured ? "text-[#b7d97e]" : "text-[#6a993c]"}`}
                      >
                        Partner pathway {number}
                      </span>
                      <h2 className="mt-1 text-[1.75rem] leading-tight tracking-[-.025em] sm:text-[2rem]">
                        <span
                          className={`saveeco-title-main ${featured ? "!text-white" : ""}`}
                        >
                          {title.split(" ")[0]}
                        </span>{" "}
                        <span
                          className={`saveeco-title-accent ${featured ? "!text-[#b8e85a]" : ""}`}
                        >
                          {title.split(" ").slice(1).join(" ")}
                        </span>
                      </h2>
                    </div>
                  </div>

                  <p
                    className={`relative z-10 mt-5 max-w-[440px] text-sm leading-6 sm:text-[.95rem] sm:leading-7 ${featured ? "text-[#e0eadc]" : "text-[#59665a]"}`}
                  >
                    {description}
                  </p>

                  <ul className="relative z-10 mt-5 space-y-3 border-t border-current/10 pt-5">
                    {benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className={`flex items-start gap-3 text-sm leading-5 ${featured ? "text-[#f2f5ed]" : "text-[#304735]"}`}
                      >
                        <span
                          className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${featured ? "bg-[#a8d84b] text-[#183b20]" : "bg-[#e8f2dc] text-[#32722a]"}`}
                        >
                          <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={href}
                    className={`join-cta group/button relative z-10 mt-auto inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-xl px-5 py-3 text-sm font-bold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8cbd45] ${
                      featured
                        ? "mt-7 bg-[#a8d83c] text-[#173b20] shadow-[0_8px_20px_rgba(0,0,0,.14)] hover:-translate-y-0.5 hover:bg-[#b8e85a]"
                        : "mt-7 bg-[#48bd00] text-[#143b20] shadow-[0_8px_20px_rgba(72,189,0,.2)] hover:-translate-y-0.5 hover:bg-[#56cd0a]"
                    }`}
                  >
                    Continue
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover/button:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </article>
              ),
            )}
          </div>

          <section
            className="join-animate mt-6 rounded-[1.6rem] border border-[#eee9d9] bg-[#f8f5eb] p-5 sm:mt-7 sm:p-7"
            aria-labelledby="how-it-works-title"
          >
            <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#5d8c37]">
                  A simple process
                </p>
                <h2
                  id="how-it-works-title"
                  className="mt-1 text-2xl tracking-[-.02em] sm:text-[1.8rem]"
                >
                  <span className="saveeco-title-main">How it</span>{" "}
                  <span className="saveeco-title-accent">works</span>
                </h2>
              </div>
              <span className="hidden items-center gap-2 pb-1 text-xs font-medium text-[#6c7864] sm:inline-flex">
                <Sprout size={16} className="text-[#5a9b31]" aria-hidden="true" />
                Three clear steps
              </span>
            </div>

            <ol className="grid gap-3 md:grid-cols-3 md:gap-4">
              {steps.map(({ title, text, Icon }, index) => (
                <li
                  key={title}
                  style={{ animationDelay: `${index * 90}ms` }}
                  className="join-animate group relative flex min-h-[108px] items-start gap-3 rounded-2xl border border-white/90 bg-white/90 p-4 shadow-[0_6px_18px_rgba(27,61,33,.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(27,61,33,.1)] sm:p-5"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e9f2d9] font-heading text-lg font-bold text-[#2d6a2b] transition duration-300 group-hover:bg-[#4abd00]">
                    0{index + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon size={15} className="text-[#6a9f39]" aria-hidden="true" />
                      <h3 className="text-base">
                        <span className="saveeco-title-main">{title.split(" ")[0]}</span>{" "}
                        <span className="saveeco-title-accent">{title.split(" ").slice(1).join(" ")}</span>
                      </h3>
                    </div>
                    <p className="mt-1.5 text-xs leading-5 text-[#5b685b] sm:text-sm sm:leading-6">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </section>
      </main>
    </PublicPageLayout>
  );
}
