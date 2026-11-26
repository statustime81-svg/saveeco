import {
  ArrowUpRight,
  Leaf,
  Mail,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../lib/siteConfig";
import logo from "../../assets/saveeco-logo.png";
import nexovaLogo from "../../assets/nexova-logo.png";

const headingFont = "var(--font-heading, 'Playfair Display', Georgia, serif)";
const accentFont = "'Cormorant Garamond', Georgia, serif";
const bodyFont = "var(--font-body, 'Manrope', Arial, sans-serif)";
const memberLoginUrl = "https://app.saveeco.in/login";
const joinNowUrl = "https://app.saveeco.in/join_now/";
const nexovaUrl = "https://www.nexovax.in/";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Join Us", href: "/join" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer
      style={{ fontFamily: bodyFont }}
      className="relative isolate overflow-hidden bg-[#123b22] text-[#f8f7ef]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_14%_0%,rgba(105,173,54,.16),transparent_36%),radial-gradient(ellipse_at_92%_80%,rgba(88,145,50,.13),transparent_34%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 z-0 size-80 translate-x-1/4 -translate-y-1/4 rounded-full border border-white/[.06] animate-[pulse_8s_ease-in-out_infinite] motion-reduce:animate-none"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 z-0 size-60 translate-x-1/4 -translate-y-1/4 rounded-full border border-white/[.05]"
      />
      <div className="relative z-10 h-[3px] bg-gradient-to-r from-transparent via-[#78c52d] to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-[1240px] gap-7 px-5 py-8 sm:px-8 sm:py-9 lg:grid-cols-[1.1fr_.8fr_1fr] lg:gap-9 lg:px-10 lg:py-10">
        <div>
          <Link
            to="/"
            aria-label="Save Eco Organic home"
            className="inline-flex rounded-2xl border border-white/10 bg-[#fbfaf3] p-2.5 shadow-[0_12px_30px_rgba(0,0,0,.14)] transition duration-300 hover:-translate-y-0.5"
          >
            <img
              src={logo}
              alt="Save Eco Organic"
              className="h-[58px] w-[120px] object-contain sm:h-[66px] sm:w-[136px]"
            />
          </Link>

          <p className="mt-5 max-w-[360px] text-sm leading-6 text-[#d5e2d1]">
            Supporting organic farming and a healthier ecosystem through
            responsible products and community partnerships.
          </p>

          <div className="mt-6 flex items-center gap-2.5">
            <a
              href={siteConfig.socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/[.06] text-[#e6efdf] transition duration-300 hover:-translate-y-1 hover:border-[#8ccb43] hover:bg-[#4abd00] hover:text-[#143b20]"
            >
              <span className="font-sans text-lg font-bold" aria-hidden="true">
                f
              </span>
            </a>

            <a
              href={siteConfig.socialLinks.x}
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/[.06] text-sm font-semibold text-[#e6efdf] transition duration-300 hover:-translate-y-1 hover:border-[#8ccb43] hover:bg-[#4abd00] hover:text-[#143b20]"
            >
              X
            </a>

            <a
              href={siteConfig.socialLinks.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/[.06] text-[#e6efdf] transition duration-300 hover:-translate-y-1 hover:border-[#8ccb43] hover:bg-[#4abd00] hover:text-[#143b20]"
            >
              <span aria-hidden="true">▶</span>
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h2
            style={{ fontFamily: headingFont }}
            className="text-lg font-semibold text-white"
          >
            Explore
          </h2>
          <span
            aria-hidden="true"
            className="mt-3 block h-[2px] w-10 rounded-full bg-[#78c52d]"
          />

          <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-[#d5e2d1]">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="group inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-[#b8e48c]"
                  to={link.href}
                >
                  <span className="size-1 rounded-full bg-[#82bb4c]/70 transition-transform duration-200 group-hover:scale-150 group-hover:bg-[#a6df67]" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-[.62rem] font-bold uppercase tracking-[.17em] text-[#a9c7a0]">
              Partner access
            </p>
            <div className="mt-3 space-y-2.5 text-sm text-[#d5e2d1]">
              <a
                className="group flex items-center justify-between gap-2 transition-colors hover:text-[#b8e48c]"
                href={memberLoginUrl}
              >
                Member Login
                <ArrowUpRight
                  size={14}
                  className="opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                className="group flex items-center justify-between gap-2 transition-colors hover:text-[#b8e48c]"
                href={joinNowUrl}
              >
                Join Now
                <ArrowUpRight
                  size={14}
                  className="opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </nav>

        <div id="contact">
          <h2
            style={{ fontFamily: headingFont }}
            className="text-lg font-semibold text-white"
          >
            Get in{" "}
            <span
              style={{
                fontFamily: accentFont,
                fontStyle: "italic",
                fontWeight: 600,
                color: "#a9d875",
                letterSpacing: "-.045em",
              }}
            >
              touch
            </span>
          </h2>
          <span
            aria-hidden="true"
            className="mt-3 block h-[2px] w-10 rounded-full bg-[#78c52d]"
          />

          <p className="mt-5 text-sm leading-6 text-[#d5e2d1]">
            We’re here to help with product questions and partnership enquiries.
          </p>

          <ul className="mt-5 space-y-3">
            <li>
              <div className="flex items-start gap-3 rounded-xl border border-white/[.08] bg-white/[.04] p-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#4abd00]/15 text-[#a9d875]">
                  <span className="text-sm font-bold" aria-hidden="true">☎</span>
                </span>
                <span className="pt-1 text-sm leading-5 text-[#e2ebde]">
                  {siteConfig.phonePrimary} / {siteConfig.phoneSecondary}
                </span>
              </div>
            </li>

            <li>
              <a
                className="group flex min-w-0 items-start gap-3 rounded-xl border border-white/[.08] bg-white/[.04] p-3 transition duration-300 hover:border-white/20 hover:bg-white/[.08]"
                href={`mailto:${siteConfig.email}`}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#4abd00]/15 text-[#a9d875]">
                  <Mail size={15} aria-hidden="true" />
                </span>
                <span className="min-w-0 break-all pt-1 text-sm leading-5 text-[#e2ebde]">
                  {siteConfig.email}
                </span>
              </a>
            </li>

            <li className="flex items-start gap-3 rounded-xl border border-white/[.08] bg-white/[.04] p-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#4abd00]/15 text-[#a9d875]">
                <MapPin size={15} aria-hidden="true" />
              </span>
              <span className="pt-1 text-sm leading-5 text-[#e2ebde]">
                {siteConfig.address}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-black/[.08] px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-2 text-center text-xs text-[#bfd0ba] sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Save Eco Organic Pvt Ltd. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
            <p className="inline-flex items-center gap-1.5">
              <Leaf size={13} className="text-[#8bc94b]" aria-hidden="true" />
              Happy Earth, Happy Us.
            </p>
            <a
              href={nexovaUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Nexova X website"
              title="Visit Nexova X"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-2.5 py-1.5 text-[#17202a] shadow-[0_4px_16px_rgba(0,0,0,.16)] transition duration-300 hover:-translate-y-0.5 hover:border-[#ed1c24] hover:shadow-[0_8px_22px_rgba(237,28,36,.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a9d875]"
            >
              <span className="block h-8 w-[76px] overflow-hidden rounded-full bg-white ring-1 ring-black/5 sm:w-[88px]">
                <img
                  src={nexovaLogo}
                  alt="Nexova X"
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="pr-1 text-[10px] font-semibold text-[#273229]">Website</span>
              <ArrowUpRight size={13} className="text-[#d5222a] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}