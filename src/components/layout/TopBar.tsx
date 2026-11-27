import { Mail } from "lucide-react";
import { siteConfig } from "../../lib/siteConfig";

const socialLinks = [
  { label: "X", href: siteConfig.socialLinks.x, kind: "x" },
  { label: "Facebook", href: siteConfig.socialLinks.facebook, kind: "facebook" },
  { label: "YouTube", href: siteConfig.socialLinks.youtube, kind: "youtube" },
];

function SocialMark({ kind }: { kind: string }) {
  if (kind === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
        <path fill="#1877F2" d="M13.4 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" />
      </svg>
    );
  }

  if (kind === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" aria-hidden="true">
        <path fill="#FF0033" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z" />
        <path fill="#FFFFFF" d="M9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" aria-hidden="true">
      <path fill="#111827" d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-5-6.6L5.9 22H2.8l7.3-8.3L2.3 2h6.4l4.6 6.1L18.9 2Zm-1.1 18h1.7L7.6 3.9H5.8L17.8 20Z" />
    </svg>
  );
}

export default function TopBar() {
  return (
    <div className="saveeco-topbar relative hidden bg-gradient-to-r from-[#124d27] via-[#1c642e] to-[#124d27] text-white sm:block">
      <div className="mx-auto flex min-h-11 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 xl:px-12">
        <div className="flex min-w-0 items-center gap-3 text-[12px] font-semibold sm:gap-5 sm:text-[13px]">
          <a
            href={`tel:${siteConfig.phonePrimary.replace(/[^\d+]/g, "")}`}
            className="inline-flex min-h-10 items-center whitespace-nowrap text-white/95 transition-colors hover:text-[#d8f4bf]"
          >
            {siteConfig.phonePrimary} / {siteConfig.phoneSecondary}
          </a>
          <span className="h-5 w-px shrink-0 bg-white/25" aria-hidden="true" />
          <a
            className="inline-flex min-h-10 min-w-0 items-center gap-2 text-white/95 transition-colors hover:text-[#d8f4bf]"
            href={`mailto:${siteConfig.email}`}
          >
            <Mail size={15} aria-hidden="true" className="shrink-0 text-[#c8e8b3]" />
            <span className="max-w-[40vw] truncate">{siteConfig.email}</span>
          </a>
        </div>

        <nav className="flex shrink-0 items-center gap-2" aria-label="Social media">
          {socialLinks.map(({ label, href, kind }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Save Eco on ${label}`}
              title={label}
              className="saveeco-topbar__social-link inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white shadow-[0_2px_7px_rgba(0,0,0,.14)] transition duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-white hover:bg-white hover:shadow-[0_5px_14px_rgba(0,0,0,.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6f3b4]"
            >
              <SocialMark kind={kind} />
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
