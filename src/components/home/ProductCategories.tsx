import { ArrowRight, Flower2, Leaf, PawPrint, Sparkles, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useCategories, type Category } from "../../hooks/useCategories";

type CardVariant = "feature" | "wide" | "compact";

const categoryIcons: Record<string, LucideIcon> = {
  agri: Sprout,
  agricultural: Sprout,
  veterinary: PawPrint,
  wellness: Flower2,
  personal: Sparkles,
  upcoming: Leaf,
};

function getCategoryIcon(slug: string): LucideIcon {
  const normalizedSlug = slug.toLowerCase();
  return Object.entries(categoryIcons).find(([key]) => normalizedSlug.includes(key))?.[1] ?? Leaf;
}

function CategoryCard({
  category,
  index,
  variant,
  className = "",
}: {
  category: Category;
  index: number;
  variant: CardVariant;
  className?: string;
}) {
  const Icon = getCategoryIcon(category.slug);
  const isFeature = variant === "feature";
  const isWide = variant === "wide";

  const cardClass = isFeature
    ? "group relative flex min-h-[430px] flex-col overflow-hidden rounded-[1.65rem] border border-[#193a25] bg-[#fbfaf3] p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(20,59,32,.14)] lg:min-h-[470px]"
    : isWide
      ? "group grid min-h-[220px] overflow-hidden rounded-[1.65rem] border border-[#193a25] bg-[#fbfaf3] p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(20,59,32,.14)] sm:grid-cols-[.82fr_1.18fr]"
      : "group overflow-hidden rounded-[1.65rem] border border-[#193a25] bg-[#fbfaf3] p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(20,59,32,.14)]";

  return (
    <Link
      to={`/products/${category.slug}`}
      aria-label={`Explore ${category.name}`}
      className={`${cardClass} ${className}`}
    >
      {isWide ? (
        <>
          <div className="flex flex-col justify-center px-3 py-3 sm:px-4">
            <span className="mb-2 w-fit -skew-x-12 rounded-md bg-[#4abd00] px-3 py-1 font-heading text-xl font-bold text-[#143b20]">
              <span className="inline-block skew-x-12">{String(index + 1).padStart(2, "0")}</span>
            </span>
            <div className="flex items-center gap-3">
              <h3 className="font-heading text-2xl font-semibold leading-tight text-[#143b20] sm:text-[2rem]">
                {category.name}
              </h3>
              <ArrowRight size={21} className="shrink-0 text-[#28721e] transition group-hover:translate-x-1" aria-hidden="true" />
            </div>
            {category.description && (
              <p className="mt-2 max-w-[300px] text-sm leading-5 text-[#455747]">{category.description}</p>
            )}
          </div>
          <div className="relative mt-3 min-h-[160px] overflow-hidden rounded-[1.2rem] bg-[#e8f1dc] sm:mt-0">
            {category.image_url ? (
              <img src={category.image_url} alt={category.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_80%_20%,#e5f2d1,transparent_42%),linear-gradient(145deg,#f7f8ee,#dce9cf)]">
                <Icon size={64} strokeWidth={1.1} className="text-[#5e9d39]/65" aria-hidden="true" />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={`relative overflow-hidden rounded-[1.2rem] bg-[#e8f1dc] ${isFeature ? "h-[250px] sm:h-[280px]" : "h-[145px]"}`}>
            {category.image_url ? (
              <img src={category.image_url} alt={category.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
            ) : (
              <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_80%_20%,#e5f2d1,transparent_42%),linear-gradient(145deg,#f7f8ee,#dce9cf)]">
                <Icon size={isFeature ? 82 : 54} strokeWidth={1.1} className="text-[#5e9d39]/65" aria-hidden="true" />
              </div>
            )}
            <span className={`absolute ${isFeature ? "bottom-0 left-5 translate-y-1/2 -skew-x-12 px-4 text-2xl" : "bottom-2 left-3 -skew-x-12 px-3 text-lg"} rounded-md bg-[#4abd00] py-1 font-heading font-bold text-[#143b20]`}>
              <span className="inline-block skew-x-12">{String(index + 1).padStart(2, "0")}</span>
            </span>
          </div>

          <div className={`flex flex-col ${isFeature ? "flex-1 px-4 pb-3 pt-5 sm:px-5" : "px-2 pb-2 pt-2.5"}`}>
            <div className="flex items-center justify-between gap-3">
              <h3 className={`font-heading font-semibold leading-[.98] tracking-[-.025em] text-[#143b20] ${isFeature ? "text-3xl sm:text-4xl" : "text-2xl sm:text-[1.8rem]"}`}>
                {category.name}
              </h3>
              <span className={`grid shrink-0 place-items-center rounded-full border border-[#4abd00] text-[#28721e] transition group-hover:bg-[#4abd00] group-hover:text-[#143b20] ${isFeature ? "size-11" : "size-9"}`}>
                <ArrowRight size={20} aria-hidden="true" />
              </span>
            </div>
            {category.description && (
              <p className={`text-[#455747] ${isFeature ? "mt-3 max-w-md text-sm leading-6" : "mt-1.5 text-xs leading-5"}`}>
                {category.description}
              </p>
            )}
            {isFeature && (
              <span className="mt-auto flex items-center gap-2 pt-3 text-sm font-bold text-[#28721e]">
                Explore {category.name}
                <ArrowRight size={17} className="transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            )}
          </div>
          {isFeature && <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-[#d8e9b8] via-[#4abd00]/45 to-transparent" />}
        </>
      )}
    </Link>
  );
}

export default function ProductCategories() {
  const { data: categories = [], isLoading, isError } = useCategories();
  // The homepage shows the four main categories only. Subcategories stay
  // available from the Products page and inside their parent category.
  const mainCategories = categories.filter((category) => !category.parent_id);
  const visibleCategories = mainCategories.slice(0, 4);
  const first = visibleCategories[0];
  const second = visibleCategories[1];
  const lowerCategories = visibleCategories.slice(2, 4);

  return (
    <section id="products" className="overflow-hidden bg-[#f8fbf2] px-5 py-8 sm:px-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-6 text-center sm:mb-8">
          <div className="mb-4 flex items-center justify-center gap-5">
            <span className="hidden h-px w-20 bg-[#9bad7d] sm:block" />
            <div>
              <Leaf size={23} className="mx-auto mb-1 text-[#4abd00]" aria-hidden="true" />
              <p className="font-heading text-xl font-bold leading-none text-[#143b20] sm:text-2xl">Save Eco Organic</p>
              <p className="mt-2 text-[.55rem] font-bold uppercase tracking-[.28em] text-[#647650]">Natural · Safe · Sustainable</p>
            </div>
            <span className="hidden h-px w-20 bg-[#9bad7d] sm:block" />
          </div>

          <h2 className="leading-[1.02] tracking-[-.035em]">
            <span className="saveeco-title-main block text-[clamp(2.2rem,4.2vw,3.8rem)]">Explore product</span>
            <span className="saveeco-title-accent block text-[clamp(2rem,3.7vw,3.35rem)]">categories</span>
          </h2>
          <span className="mx-auto mt-3 block h-[3px] w-24 -rotate-2 rounded-full bg-[#4abd00]" />
        </header>

        {isLoading && (
            <div className="grid gap-4 lg:grid-cols-[.95fr_1.4fr]" aria-label="Loading product categories">
            <div className="min-h-[430px] animate-pulse rounded-[1.65rem] bg-[#e9efdf]" />
            <div className="grid gap-4 lg:grid-rows-[220px_250px]">
              <div className="animate-pulse rounded-[1.65rem] bg-[#e9efdf]" />
              <div className="animate-pulse rounded-[1.65rem] bg-[#e9efdf]" />
            </div>
          </div>
        )}

        {isError && (
          <p role="alert" className="rounded-2xl border border-[#f2d3cb] bg-[#fff5f1] px-5 py-4 text-sm text-[#a84431]">
            Categories could not be loaded. Please check the connection and try again.
          </p>
        )}

        {!isLoading && !isError && mainCategories.length === 0 && (
          <p className="rounded-2xl border border-[#e5e8dc] bg-white px-5 py-6 text-sm text-[#71806f]">
            No active categories are available yet. Add and activate categories in the admin panel to show them here.
          </p>
        )}

        {!isLoading && !isError && first && (
          <>
            <div className={`grid gap-4 ${second ? "lg:grid-cols-[.95fr_1.4fr]" : "lg:grid-cols-1"}`}>
              <CategoryCard category={first} index={0} variant="feature" />

              {second && (
                <div className="grid gap-4 lg:grid-rows-[220px_250px]">
                  <CategoryCard
                    category={second}
                    index={1}
                    variant="wide"
                    className={lowerCategories.length === 0 ? "lg:row-span-2" : ""}
                  />

                  {lowerCategories.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {lowerCategories.map((category, index) => (
                        <CategoryCard
                          key={category.id}
                          category={category}
                          index={index + 2}
                          variant="compact"
                          className={lowerCategories.length === 1 ? "sm:col-span-2" : ""}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center sm:mt-8">
              <Link
                to="/products"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-[#246a35] bg-white px-6 py-2.5 text-sm font-bold text-[#1d5b2c] shadow-[0_8px_22px_rgba(20,59,32,.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#17652b] hover:text-white hover:shadow-[0_12px_28px_rgba(20,59,32,.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4abd00]"
              >
                Explore more categories
                <ArrowRight size={17} className="transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
