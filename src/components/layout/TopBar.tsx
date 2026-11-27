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
      <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden="true">
        <path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" />
      </svg>
    );
  }

  if (kind === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="size-[15px] fill-current" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
      </svg>
    );
  }

  return <span className="text-[12px] font-extrabold leading-none" aria-hidden="true">𝕏</span>;
}

export default function TopBar() {
  return (
    <div className="saveeco-topbar relative hidden bg-gradient-to-r from-[#155322] via-[#1b642b] to-[#155322] text-white sm:block">
      <div className="mx-auto flex min-h-10 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 xl:px-12">
        <div className="flex min-w-0 items-center gap-3 text-[12px] font-semibold sm:gap-5 sm:text-[13px]">
          <a
            href={`tel:${siteConfig.phonePrimary.replace(/[^\d+]/g, "")}`}
            className="inline-flex min-h-11 items-center whitespace-nowrap text-white/95 transition hover:text-[#d8f4bf]"
          >
            {siteConfig.phonePrimary} / {siteConfig.phoneSecondary}
          </a>
          <span className="h-5 w-px shrink-0 bg-white/25" aria-hidden="true" />
          <a
            className="inline-flex min-h-11 min-w-0 items-center gap-2 text-white/95 transition hover:text-[#d8f4bf]"
            href={`mailto:${siteConfig.email}`}
          >
            <Mail size={14} aria-hidden="true" className="shrink-0 text-[#c8e8b3]" />
            <span className="inline-flex min-h-11 items-center truncate">{siteConfig.email}</span>
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
              className="grid size-7 place-items-center rounded-full border border-white/15 bg-white/[0.08] text-white transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <SocialMark kind={kind} />
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
