import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../lib/siteConfig";

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
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto grid max-w-site gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
        <div>
          <Link to="/" className="font-heading text-xl font-semibold">
            Save Eco Organic
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-green-100">
            Supporting organic farming and a healthier ecosystem through
            responsible products and community partnerships.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href={siteConfig.socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid size-8 place-items-center rounded-full bg-white/10 text-sm font-bold"
            >
              f
            </a>
            <a
              href={siteConfig.socialLinks.x}
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="grid size-8 place-items-center rounded-full bg-white/10 text-xs font-bold"
            >
              X
            </a>
            <a
              href={siteConfig.socialLinks.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="grid h-8 w-10 place-items-center rounded bg-white/10 text-xs"
            >
              ▶
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-base font-semibold">Quick Links</h2>
          <ul className="mt-4 space-y-3 text-sm text-green-100">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-white" to={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={siteConfig.externalLinks.memberLogin}>Member Login</a>
            </li>
            <li>
              <a href={siteConfig.externalLinks.channelPartnerLogin}>
                Channel Partner Login
              </a>
            </li>
          </ul>
        </div>

        <div id="contact">
          <h2 className="font-heading text-base font-semibold">Contact Us</h2>
          <ul className="mt-4 space-y-4 text-sm leading-6 text-green-100">
            <li className="flex gap-3">
              <Phone className="mt-1 shrink-0" size={17} aria-hidden="true" />
              <a href={`tel:${siteConfig.phonePrimary}`}>
                {siteConfig.phonePrimary} / {siteConfig.phoneSecondary}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-1 shrink-0" size={17} aria-hidden="true" />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-1 shrink-0" size={17} aria-hidden="true" />
              <span>{siteConfig.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 px-5 py-4 text-center text-xs text-green-100">
        © {new Date().getFullYear()} Save Eco Organic Pvt Ltd.
      </div>
    </footer>
  );
}  
