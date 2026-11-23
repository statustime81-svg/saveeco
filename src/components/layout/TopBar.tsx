import { Mail, Phone, Sprout } from "lucide-react";
import { siteConfig } from "../../lib/siteConfig";

const socialLinks = [
  { label: "Facebook", href: siteConfig.socialLinks.facebook, mark: "f" },
  { label: "X", href: siteConfig.socialLinks.x, mark: "X" },
  { label: "YouTube", href: siteConfig.socialLinks.youtube, mark: "▶" },
];

export default function TopBar() {
  return (
    <div className="saveeco-topbar relative hidden overflow-hidden bg-gradient-to-r from-[#155322] via-[#1b642b] to-[#155322] text-white sm:block">
      <Sprout aria-hidden="true" className="pointer-events-none absolute -right-3 -top-7 size-24 rotate-12 text-white/[0.08]" strokeWidth={1.1} />
      <div className="relative mx-auto flex min-h-11 max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-2 sm:px-8 xl:px-12">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[12px] font-medium sm:text-[13px]">
          <a className="inline-flex items-center gap-2.5 text-white/95 transition hover:text-[#d8f4bf]" href={`tel:${siteConfig.phonePrimary}`}>
            <Phone size={14} aria-hidden="true" className="text-[#c8e8b3]" />
            <span>{siteConfig.phonePrimary} / {siteConfig.phoneSecondary}</span>
          </a>
          <span className="hidden h-5 w-px bg-white/20 md:block" aria-hidden="true" />
          <a className="inline-flex items-center gap-2.5 text-white/95 transition hover:text-[#d8f4bf]" href={`mailto:${siteConfig.email}`}>
            <Mail size={15} aria-hidden="true" className="text-[#c8e8b3]" />
            <span>{siteConfig.email}</span>
          </a>
        </div>

        <nav className="flex items-center gap-2" aria-label="Social media">
          {socialLinks.map(({ label, href, mark }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Save Eco on ${label}`}
              className="grid size-7 place-items-center rounded-full border border-white/10 bg-white/[0.09] text-[12px] font-bold text-white/90 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {mark}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
