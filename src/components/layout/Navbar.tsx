import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Flower2,
  Leaf,
  Menu,
  Package,
  PawPrint,
  Sprout,
  Sparkles,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import saveEcoLogo from "../../assets/saveeco-navbar-logo.png";
import { useCategories } from "../../hooks/useCategories";

const memberLoginUrl = "https://app.saveeco.in/login";
const joinNowUrl = "https://app.saveeco.in/join_now/";

const navLinks = [
  { labelKey: "home", href: "/" },
  { labelKey: "about", href: "/about", dropdown: true },
  { labelKey: "products", href: "/products", dropdown: true },
  { labelKey: "join", href: "/join" },
  { labelKey: "gallery", href: "/gallery" },
  { labelKey: "contact", href: "/contact" },
];

const aboutLinks = [
  { label: "About Save Eco", href: "/about#about-intro", note: "Company overview" },
  { label: "Mission & Vision", href: "/about#mission", note: "Our commitment" },
  { label: "Our Goal", href: "/about#our-goal", note: "A healthier environment" },
  { label: "Legal", href: "/legal", note: "Certificates & documents" },
  { label: "Our Team", href: "/about/team", note: "Meet the team" },
];

const categoryIcons: Record<string, LucideIcon> = {
  agri: Sprout,
  agricultural: Sprout,
  veterinary: PawPrint,
  wellness: Flower2,
  personal: Sparkles,
  upcoming: Package,
};

function getCategoryIcon(slug: string): LucideIcon {
  const normalizedSlug = slug.toLowerCase();

  return (
    Object.entries(categoryIcons).find(([key]) =>
      normalizedSlug.includes(key),
    )?.[1] ?? Leaf
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileActiveCategoryId, setMobileActiveCategoryId] =
    useState<string | null>(null);
  const [desktopProductsOpen, setDesktopProductsOpen] = useState(false);
  const [activeDesktopCategoryId, setActiveDesktopCategoryId] =
    useState<string | null>(null);

  const { t } = useTranslation();
  const location = useLocation();

  const scrollToHomeTop = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();

  const mainCategories = categories.filter(
    (category) => !category.parent_id,
  );

  const menuCategories = [
    ...mainCategories,
    ...(mainCategories.some((category) => category.slug === "upcoming")
      ? []
      : [
          {
            id: "upcoming-static",
            name: "Upcoming Product",
            slug: "upcoming",
            parent_id: null,
            sort_order: 999,
          },
        ]),
  ];

  useEffect(() => {
    setMenuOpen(false);
    setMobileAboutOpen(false);
    setMobileProductsOpen(false);
    setMobileActiveCategoryId(null);
    setDesktopProductsOpen(false);
    setActiveDesktopCategoryId(null);
  }, [location.pathname, location.hash]);

  return (
    <header className="saveeco-navbar sticky top-0 z-50 border-b border-[#e8eee5] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[78px] max-w-[1440px] items-center justify-between gap-3 px-5 sm:min-h-[84px] sm:px-8 xl:gap-5 xl:px-12">
        <Link
          to="/"
          onClick={scrollToHomeTop}
          className="flex w-[110px] shrink-0 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary sm:w-[124px] xl:w-[136px]"
          aria-label="Save Eco Organic home"
        >
          <img
            src={saveEcoLogo}
            alt="Save Eco Organic"
            className="h-auto w-full object-contain"
            width="540"
            height="263"
            fetchPriority="high"
          />
        </Link>

        <nav
          className="hidden items-center gap-0.5 rounded-full border border-[#e9f0e6] bg-[#f8fbf7] p-1.5 shadow-[0_5px_18px_rgba(27,61,33,.035)] xl:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            if (link.labelKey === "products") {
              return (
                <div
                  key={link.href}
                  className="saveeco-products-menu relative"
                  onPointerEnter={() => setDesktopProductsOpen(true)}
                  onPointerLeave={() => {
                    setDesktopProductsOpen(false);
                    setActiveDesktopCategoryId(null);
                  }}
                  onMouseEnter={() => setDesktopProductsOpen(true)}
                  onMouseLeave={() => {
                    setDesktopProductsOpen(false);
                    setActiveDesktopCategoryId(null);
                  }}
                  onFocusCapture={() => setDesktopProductsOpen(true)}
                  onBlurCapture={(event) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null,
                      )
                    ) {
                      setDesktopProductsOpen(false);
                      setActiveDesktopCategoryId(null);
                    }
                  }}
                >
                  <NavLink
                    to={link.href}
                    aria-haspopup="true"
                    aria-expanded={desktopProductsOpen}
                    className={({ isActive }) =>
                      `group inline-flex min-h-11 items-center gap-1 rounded-full px-4 text-[13px] font-bold tracking-[-.015em] transition-all duration-200 ${
                        isActive || desktopProductsOpen
                          ? "bg-[#e9f6dd] text-[#17652b] shadow-[0_3px_10px_rgba(35,95,29,.1)]"
                          : "text-[#26372a] hover:bg-white hover:text-[#17652b]"
                      }`
                    }
                  >
                    {t(`nav.${link.labelKey}`)}
                    <ChevronDown
                      size={14}
                      className={`text-[#739176] transition-transform duration-200 ${
                        desktopProductsOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </NavLink>

                  <div className="saveeco-products-dropdown invisible pointer-events-none absolute left-1/2 top-full z-50 w-[210px] pt-3 opacity-0 transition duration-200">
                    <div className="relative max-h-[min(60vh,360px)] overflow-visible overflow-y-auto rounded-xl border border-[#dfe9d9] bg-[#f6f9f1] p-2 shadow-[0_18px_45px_rgba(19,55,28,.18)]">
                      {menuCategories.map((category) => {
                        const Icon = getCategoryIcon(category.slug);
                        const children = categories.filter(
                          (child) => child.parent_id === category.id,
                        );
                        const isActive =
                          activeDesktopCategoryId === category.id;

                        return (
                          <div
                            key={category.id}
                            className="saveeco-category-row relative"
                            onMouseEnter={() =>
                              setActiveDesktopCategoryId(category.id)
                            }
                            onFocus={() =>
                              setActiveDesktopCategoryId(category.id)
                            }
                          >
                            <Link
                              to={`/products/${category.slug}`}
                              className={`flex min-h-10 items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold transition-colors duration-150 ${
                                isActive
                                  ? "bg-[#e5f2d9] text-[#245f1d] shadow-sm"
                                  : "text-[#344638] hover:bg-[#edf6e4] hover:text-[#17652b]"
                              }`}
                            >
                              <Icon size={16} aria-hidden="true" />
                              <span className="min-w-0 flex-1 leading-tight">
                                {category.name}
                              </span>

                              {children.length > 0 && (
                                <ArrowRight
                                  size={14}
                                  className="shrink-0"
                                  aria-hidden="true"
                                />
                              )}
                            </Link>

                            {children.length > 0 && (
                              <div
                                className={`saveeco-row-flyout ${
                                  isActive ? "is-open" : ""
                                }`}
                                aria-label={`${category.name} subcategories`}
                              >
                                <div className="overflow-hidden rounded-xl border border-[#e1ead9] bg-[#fffef9] p-2 shadow-[0_18px_40px_rgba(19,55,28,.16)]">
                                  {children.map((subcategory) => (
                                    <Link
                                      key={subcategory.id}
                                      to={`/products/${subcategory.slug}`}
                                      className="flex min-h-10 items-center justify-between gap-3 border-b border-[#edf1e8] px-3 py-2 text-[13px] font-medium text-[#344638] transition-colors last:border-b-0 hover:bg-[#f1f7e9] hover:text-[#17652b]"
                                    >
                                      <span>{subcategory.name}</span>
                                      <ArrowRight
                                        size={14}
                                        className="shrink-0 text-[#4a8c20]"
                                        aria-hidden="true"
                                      />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {menuCategories.length === 0 && (
                        <p className="px-2.5 py-3 text-xs text-white/75">
                          {categoriesLoading
                            ? "Loading categories…"
                            : categoriesError
                              ? "Categories could not be loaded."
                              : "No active categories yet."}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            if (link.labelKey === "about") {
              return (
                <div key={link.href} className="group/about relative">
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `group inline-flex min-h-11 items-center gap-1 rounded-full px-4 text-[14px] font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-[#eff8e7] text-[#17652b] shadow-sm"
                          : "text-[#26372a] hover:bg-white hover:text-[#17652b]"
                      }`
                    }
                    aria-haspopup="true"
                  >
                    {t(`nav.${link.labelKey}`)}
                    <ChevronDown
                      size={14}
                      className="text-[#739176] transition-transform duration-200 group-hover:rotate-180"
                      aria-hidden="true"
                    />
                  </NavLink>

                  <div className="invisible absolute left-1/2 top-full z-50 w-[min(620px,calc(100vw-32px))] -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition duration-200 group-hover/about:visible group-hover/about:translate-y-0 group-hover/about:opacity-100 group-focus-within/about:visible group-focus-within/about:translate-y-0 group-focus-within/about:opacity-100">
                    <div className="overflow-hidden rounded-[1.25rem] border border-[#e1ead9] bg-[#fffef9] p-4 shadow-[0_20px_55px_rgba(19,55,28,.16)]">
                      <div className="grid gap-1 sm:grid-cols-2">
                        {aboutLinks.map((item, index) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="group/item flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-[#f1f7e9]"
                          >
                            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#edf6e4] font-heading text-xs font-bold text-[#4a8c20] transition group-hover/item:bg-[#4abd00] group-hover/item:text-white">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-[#173b25]">
                                {item.label}
                              </span>
                              <span className="mt-0.5 block text-[11px] text-[#72806c]">
                                {item.note}
                              </span>
                            </span>
                            <ArrowUpRight
                              size={15}
                              className="text-[#75a94a] opacity-0 transition group-hover/item:opacity-100"
                              aria-hidden="true"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === "/"}
                onClick={link.href === "/" ? scrollToHomeTop : undefined}
                className={({ isActive }) =>
                  `inline-flex min-h-11 items-center rounded-full px-4 text-[14px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#eff8e7] text-[#17652b] shadow-sm"
                      : "text-[#26372a] hover:bg-white hover:text-[#17652b]"
                  }`
                }
              >
                {t(`nav.${link.labelKey}`)}
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <a
            href={memberLoginUrl}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#26733a] bg-white px-5 text-sm font-semibold text-[#185d2d] transition hover:bg-[#f1f7ef]"
          >
            {t("actions.memberLogin")}
          </a>

          <a
            href={joinNowUrl}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#4abd00] px-5 text-sm font-semibold text-[#173a18] shadow-[0_5px_14px_rgba(74,189,0,.18)] transition hover:-translate-y-0.5 hover:bg-[#3da700]"
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
        <div
          id="saveeco-mobile-navigation"
          className="border-t border-[#e9efe7] bg-white px-5 pb-5 pt-3 shadow-[0_16px_28px_rgba(20,55,28,.08)] sm:px-8 xl:hidden"
        >
          <nav
            className="mx-auto flex max-w-[1440px] flex-col"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => {
              if (link.labelKey === "products") {
                return (
                  <div
                    key={link.href}
                    className="border-b border-[#edf1eb]"
                  >
                    <div className="flex min-h-12 items-center justify-between px-2">
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `text-sm font-semibold ${
                            isActive ? "text-[#17652b]" : "text-[#26372a]"
                          }`
                        }
                      >
                        {t(`nav.${link.labelKey}`)}
                      </NavLink>

                      <button
                        type="button"
                        aria-label="Show product categories"
                        aria-expanded={mobileProductsOpen}
                        onClick={() =>
                          setMobileProductsOpen((open) => !open)
                        }
                        className="grid size-9 place-items-center rounded-full text-[#397c23] hover:bg-[#eef6e8]"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            mobileProductsOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {mobileProductsOpen && (
                      <div className="grid gap-1 pb-3 pl-2">
                        {menuCategories.map((category) => {
                          const children = categories.filter(
                            (child) => child.parent_id === category.id,
                          );
                          const isExpanded =
                            mobileActiveCategoryId === category.id;

                          return (
                            <div key={category.id}>
                              <div className="flex min-h-10 items-center">
                                <Link
                                  to={`/products/${category.slug}`}
                                  className="flex-1 rounded-lg px-2.5 py-2 text-xs font-bold text-[#24452b] hover:bg-[#f1f7e9]"
                                >
                                  {category.name}
                                </Link>

                                {children.length > 0 && (
                                  <button
                                    type="button"
                                    aria-label={`Show ${category.name} subcategories`}
                                    aria-expanded={isExpanded}
                                    onClick={() =>
                                      setMobileActiveCategoryId(
                                        isExpanded ? null : category.id,
                                      )
                                    }
                                    className="grid size-9 place-items-center rounded-full text-[#397c23] hover:bg-[#eef6e8]"
                                  >
                                    <ChevronDown
                                      size={15}
                                      className={`transition-transform ${
                                        isExpanded ? "rotate-180" : ""
                                      }`}
                                      aria-hidden="true"
                                    />
                                  </button>
                                )}
                              </div>

                              {isExpanded && (
                                <div className="ml-3 border-l border-[#dce8d2] pl-2">
                                  {children.map((subcategory) => (
                                    <Link
                                      key={subcategory.id}
                                      to={`/products/${subcategory.slug}`}
                                      className="block rounded-lg px-2.5 py-2 text-xs font-medium text-[#657363] hover:bg-[#f1f7e9] hover:text-[#17652b]"
                                    >
                                      {subcategory.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {menuCategories.length === 0 && (
                          <p className="px-2.5 py-2 text-xs text-[#72806c]">
                            {categoriesLoading
                              ? "Loading categories…"
                              : categoriesError
                                ? "Categories could not be loaded."
                                : "No active categories yet."}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              if (link.labelKey === "about") {
                return (
                  <div
                    key={link.href}
                    className="border-b border-[#edf1eb]"
                  >
                    <div className="flex min-h-12 items-center justify-between px-2">
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `text-sm font-semibold ${
                            isActive ? "text-[#17652b]" : "text-[#26372a]"
                          }`
                        }
                      >
                        {t(`nav.${link.labelKey}`)}
                      </NavLink>

                      <button
                        type="button"
                        aria-label="Show About links"
                        aria-expanded={mobileAboutOpen}
                        onClick={() =>
                          setMobileAboutOpen((open) => !open)
                        }
                        className="grid size-9 place-items-center rounded-full text-[#397c23] hover:bg-[#eef6e8]"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            mobileAboutOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {mobileAboutOpen && (
                      <div className="grid grid-cols-2 gap-1 pb-3 pl-2">
                        {aboutLinks.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="rounded-lg px-2.5 py-2 text-xs font-semibold text-[#4a5b4c] hover:bg-[#f1f7e9] hover:text-[#17652b]"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === "/"}
                  onClick={link.href === "/" ? scrollToHomeTop : undefined}
                  className={({ isActive }) =>
                    `flex min-h-12 items-center border-b border-[#edf1eb] px-2 text-sm font-semibold ${
                      isActive ? "text-[#17652b]" : "text-[#26372a]"
                    }`
                  }
                >
                  {t(`nav.${link.labelKey}`)}
                </NavLink>
              );
            })}
          </nav>

          <div className="mx-auto mt-4 flex max-w-[1440px] flex-wrap gap-2">
            <a
              href={memberLoginUrl}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-[#26733a] px-4 text-sm font-semibold text-[#185d2d]"
            >
              {t("actions.memberLogin")}
            </a>

            <a
              href={joinNowUrl}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#4abd00] px-4 text-sm font-semibold text-[#173a18] hover:bg-[#3da700]"
            >
              <Leaf size={15} aria-hidden="true" />
              {t("actions.joinNow")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}