import { ArrowRight, Mail, Phone } from "lucide-react";
import { siteConfig } from "../../lib/siteConfig";
import contactBg from "../../assets/contact-bg.png";

const headingFont = "var(--font-heading, 'Playfair Display', Georgia, serif)";
const accentFont = "'Cormorant Garamond', Georgia, serif";
const bodyFont = "var(--font-body, 'Manrope', Arial, sans-serif)";

export default function ContactStrip() {
  return (
    <section
      style={{ fontFamily: bodyFont }}
      className="relative isolate overflow-hidden border-y border-[#e9e5d8] bg-[#fbf8ef] px-5 py-9 sm:px-8 sm:py-11 lg:px-12"
    >
      <img
        src={contactBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-100"
        style={{ objectPosition: "right top" }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-r from-[#fbf8ef]/25 via-[#fbf8ef]/10 to-transparent"
      />

      <div className="relative z-10 mx-auto flex max-w-site flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#36712d]">
            Have a question?
          </p>

          <h2
            style={{ fontFamily: headingFont }}
            className="mt-2 text-2xl font-semibold leading-tight text-[#143b20] sm:text-3xl"
          >
            Get in touch with{" "}
            <span
              style={{
                fontFamily: accentFont,
                fontStyle: "italic",
                fontWeight: 600,
                color: "#4a8c20",
                letterSpacing: "-.045em",
              }}
            >
              Save Eco
            </span>
          </h2>

          <div className="mt-4 flex flex-col gap-3 text-sm text-[#294632] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
            <a
              className="group inline-flex min-h-11 items-center gap-2 transition-colors hover:text-[#4abd00]"
              href={`tel:${siteConfig.phonePrimary}`}
            >
              <Phone
                size={17}
                className="text-[#39812d] transition-transform group-hover:rotate-[-8deg]"
                aria-hidden="true"
              />
              {siteConfig.phonePrimary}
            </a>

            <a
              className="group inline-flex min-h-11 min-w-0 items-center gap-2 transition-colors hover:text-[#4abd00]"
              href={`mailto:${siteConfig.email}`}
            >
              <Mail
                size={17}
                className="shrink-0 text-[#39812d]"
                aria-hidden="true"
              />
              <span className="break-all">{siteConfig.email}</span>
            </a>
          </div>
        </div>

        <div className="flex shrink-0 items-center md:border-l md:border-[#96b66c]/60 md:pl-8">
          <a
            href="#home-contact"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#4abd00] px-6 py-3 text-sm font-bold text-[#143b20] shadow-[0_8px_20px_rgba(74,189,0,.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#43ad00] hover:shadow-[0_12px_25px_rgba(74,189,0,.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#245f1d] sm:w-auto"
          >
            Send a message
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}