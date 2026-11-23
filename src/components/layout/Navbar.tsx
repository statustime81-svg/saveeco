import { useEffect, useState } from "react";
import { ChevronDown, Leaf, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { siteConfig } from "../../lib/siteConfig";
import saveEcoLogo from "../../assets/saveeco-logo.png";

const navLinks = [
  { labelKey: "home", href: "/" },
  { labelKey: "about", href: "/about", dropdown: true },
  { labelKey: "products", href: "/products", dropdown: true },
  { labelKey: "join", href: "/join" },
  { labelKey: "gallery", href: "/gallery" },
  { labelKey: "contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const toggleLanguage = () => {
    void i18n.changeLanguage(i18n.language === "en" ? "hi" : "en");
  };

  return (
    <header className="saveeco-navbar sticky top-0 z-50 border-b border-[#e8eee5] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[86px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 xl:px-12">
        <Link
          to="/"
          className="flex w-[172px] shrink-0 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary sm:w-[190px]"
          aria-label="Save Eco Organic home"
        >
          <img
            src={saveEcoLogo}
            alt="Save Eco Organic"
            className="h-auto w-full object-contain"
            width="160"
            height="78"
            fetchPriority="high"
          />
        </Link>

        <nav
          className="hidden items-center gap-0.5 rounded-full border border-[#eef3ec] bg-[#f8fbf7] p-1.5 xl:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              className={({ isActive }) =>
                `group inline-flex min-h-11 items-center gap-1 rounded-full px-4 text-[14px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#e6f2e3] text-[#17652b] shadow-sm"
                    : "text-[#26372a] hover:bg-white hover:text-[#17652b]"
                }`
              }
            >
              {t(`nav.${link.labelKey}`)}
              {link.dropdown && <ChevronDown size={14} className="text-[#739176] transition-transform group-hover:translate-y-0.5" aria-hidden="true" />}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-sm font-bold text-[#17652b] transition hover:bg-[#eef6ec] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            aria-label="Change language"
            title="Change language"
          >
            {i18n.language === "en" ? "HI" : "EN"}
          </button>
          <a
            href={siteConfig.externalLinks.memberLogin}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#26733a] bg-white px-5 text-sm font-semibold text-[#185d2d] transition hover:bg-[#f1f7ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            {t("actions.memberLogin")}
          </a>
          <a
            href={siteConfig.externalLinks.directPartnerJoin}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#17652b] px-5 text-sm font-semibold text-white shadow-[0_5px_14px_rgba(23,101,43,.16)] transition hover:-translate-y-0.5 hover:bg-[#124f23] hover:shadow-[0_8px_18px_rgba(23,101,43,.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Leaf size={15} aria-hidden="true" />
            {t("actions.joinNow")}
          </a>
        </div>

        <button
          type="button"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-[#dce8da] bg-[#f8fbf7] text-[#17652b] transition hover:bg-[#eaf4e7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary xl:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="saveeco-mobile-navigation"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {menuOpen && (
        <div id="saveeco-mobile-navigation" className="border-t border-[#e9efe7] bg-white px-5 pb-5 pt-3 shadow-[0_16px_28px_rgba(20,55,28,.08)] sm:px-8 xl:hidden">
          <nav className="mx-auto flex max-w-[1440px] flex-col" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === "/"}
                className={({ isActive }) => `flex min-h-12 items-center justify-between border-b border-[#edf1eb] px-2 text-sm font-semibold ${isActive ? "text-[#17652b]" : "text-[#26372a]"}`}
              >
                {t(`nav.${link.labelKey}`)}
                {link.dropdown && <ChevronDown size={15} className="text-[#739176]" aria-hidden="true" />}
              </NavLink>
            ))}
          </nav>
          <div className="mx-auto mt-4 flex max-w-[1440px] flex-wrap gap-2">
            <button type="button" onClick={toggleLanguage} className="min-h-11 rounded-full border border-[#dce8da] px-4 text-sm font-bold text-[#17652b]">{i18n.language === "en" ? "HI" : "EN"}</button>
            <a href={siteConfig.externalLinks.memberLogin} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-[#26733a] px-4 text-sm font-semibold text-[#185d2d]">{t("actions.memberLogin")}</a>
            <a href={siteConfig.externalLinks.directPartnerJoin} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#17652b] px-4 text-sm font-semibold text-white"><Leaf size={15} />{t("actions.joinNow")}</a>
          </div>
        </div>
      )}
    </header>
  );
}
