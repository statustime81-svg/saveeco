import { useMemo, useState } from "react";
import {
  ArrowRight,
  Flower2,
  Leaf,
  PawPrint,
  Search,
  Sparkles,
  Sprout,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import TopBar from "../components/layout/TopBar";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import farmHero from "../assets/hero-slide-farmer.webp";
import { CategoryGridSkeleton, ProductGridSkeleton } from "../components/ui/SaveEcoSkeleton";

const categoryIcons: Record<string, LucideIcon> = {
  agri: Sprout,
  agricultural: Sprout,
  veterinary: PawPrint,
  wellness: Flower2,
  personal: Sparkles,
  upcoming: Leaf,
};

function getCategoryIcon(slug: string): LucideIcon {
  const key = slug.toLowerCase();

  return (
    Object.entries(categoryIcons).find(([match]) => key.includes(match))?.[1] ??
    Leaf
  );
}

export default function Products() {
  const [search, setSearch] = useState("");
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState<string | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useProducts();

  const mainCategories = useMemo(
    () => categories.filter((category) => !category.parent_id),
    [categories],
  );
  const selectedMainCategory = mainCategories.find(
    (category) => category.id === selectedMainCategoryId,
  );
  const subcategories = useMemo(
    () => selectedMainCategoryId
      ? categories.filter((category) => category.parent_id === selectedMainCategoryId)
      : [],
    [categories, selectedMainCategoryId],
  );
  const selectedSubcategory = subcategories.find(
    (category) => category.id === selectedSubcategoryId,
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.short_description?.toLowerCase().includes(normalizedSearch);
      const matchesCategory = selectedSubcategory
        ? product.category?.slug === selectedSubcategory.slug
        : selectedMainCategory
          ? product.category?.slug === selectedMainCategory.slug ||
            product.category?.parent?.slug === selectedMainCategory.slug
          : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedMainCategory, selectedSubcategory]);

  return (
    <>
      <TopBar />
      <Navbar />

      <main className="product-page min-w-0 overflow-x-hidden bg-[#fbfaf5] font-body text-[#173b25]">
        <section
          aria-labelledby="products-title"
          className="relative isolate min-h-[290px] overflow-visible bg-[#eaf2df] bg-cover bg-center sm:min-h-[370px] lg:min-h-[410px]"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(241,247,229,.98) 0%, rgba(241,247,229,.9) 34%, rgba(241,247,229,.32) 73%, rgba(241,247,229,.04) 100%), url(${farmHero})`,
          }}
        >
          <div className="mx-auto flex min-h-[290px] max-w-[1440px] items-center px-4 py-8 sm:min-h-[370px] sm:px-8 lg:min-h-[410px] lg:px-12">
            <div className="product-reveal max-w-[540px]">
              <nav
                aria-label="Breadcrumb"
                className="mb-6 text-sm font-medium text-[#607064]"
              >
                <Link to="/" className="transition hover:text-[#287127]">
                  Home
                </Link>
                <span className="mx-2 text-[#87a276]" aria-hidden="true">
                  /
                </span>
                <span aria-current="page">Products</span>
              </nav>

              <p className="inline-flex items-center gap-2 text-[.68rem] font-bold uppercase tracking-[.22em] text-[#39832d] sm:text-xs">
                <span className="h-px w-7 bg-[#78b836]" />
                Save Eco Organic Collection
              </p>

              <h1
                id="products-title"
                className="mt-3 break-words text-[clamp(2.1rem,10vw,4.8rem)] leading-[.97] tracking-[-.045em]"
              >
                <span className="saveeco-title-main">Product</span><br /><span className="saveeco-title-accent">Categories</span>
              </h1>

              <p className="mt-4 max-w-[480px] text-sm leading-6 text-[#526356] sm:text-base sm:leading-7">
                Choose a category to explore its products and product details.
              </p>

              <a
                href="#product-categories"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#276f2b] transition hover:gap-3"
              >
                Explore categories
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          id="product-categories"
          className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-7 pt-6 sm:px-8 sm:pb-9 sm:pt-10 lg:px-12"
        >
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-[#679344]">
                Browse by collection
              </p>
              <h2 className="mt-1 text-2xl tracking-[-.025em] sm:text-3xl">
                <span className="saveeco-title-main">Find what</span> <span className="saveeco-title-accent">you need</span>
              </h2>
            </div>

            <span className="hidden text-sm text-[#71806f] sm:block">
              Explore our product collections
            </span>
          </div>

          {categoriesLoading && <CategoryGridSkeleton count={5} />}

          {categoriesError && (
            <p
              role="alert"
              className="rounded-2xl border border-[#f2d3cb] bg-[#fff5f1] px-5 py-4 text-sm text-[#a84431]"
            >
              Categories could not be loaded. Please check the connection and
              try again.
            </p>
          )}

          {!categoriesLoading &&
            !categoriesError &&
            mainCategories.length === 0 && (
              <p className="rounded-2xl border border-[#e5e8dc] bg-white px-5 py-6 text-sm text-[#71806f]">
                No active main categories are available yet. Add and activate
                main categories in the admin panel to show them here.
              </p>
            )}

          {!categoriesLoading &&
            !categoriesError &&
            mainCategories.length > 0 && (
              <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
                {mainCategories.map((category, index) => {
                  const Icon = getCategoryIcon(category.slug);

                  return (
                    <button
                      key={category.id}
                      type="button"
                      aria-label={"Show subcategories for " + category.name}
                      aria-pressed={selectedMainCategoryId === category.id}
                      onClick={() => {
                        setSelectedMainCategoryId((current) => current === category.id ? null : category.id);
                        setSelectedSubcategoryId(null);
                      }}
                      style={{ animationDelay: (index * 70) + "ms" }}
                      className={"product-reveal group relative isolate flex min-h-[145px] w-full flex-col justify-end overflow-hidden rounded-[1.25rem] border bg-[#e7eddb] text-left shadow-[0_8px_24px_rgba(25,61,32,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(25,61,32,.16)] sm:min-h-[220px] lg:min-h-[240px] " + (selectedMainCategoryId === category.id ? "border-[#4abd00] ring-2 ring-[#4abd00]/50" : "border-[#e5e8d8")}
                    >
                      {category.image_url ? (
                        <img
                          src={category.image_url}
                          alt={category.name}
                          loading="lazy"
                          className="product-image absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_20%,#e5f2d1,transparent_42%),linear-gradient(145deg,#f7f8ee,#dce9cf)]"
                        />
                      )}

                      <span
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0c2819]/90 via-[#153b22]/20 to-transparent"
                      />

                      <span className="absolute left-3 top-3 grid size-8 place-items-center rounded-full border border-white/55 bg-white/90 font-heading text-xs font-bold text-[#28652c] shadow-sm sm:left-4 sm:top-4 sm:size-9">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="flex items-end justify-between gap-2 p-3 text-white sm:p-4">
                        <span className="font-heading text-base font-semibold leading-tight sm:text-lg">
                          {category.name}
                        </span>

                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#b8e85a] text-[#173b25] transition group-hover:translate-x-1 sm:size-9">
                          <Icon size={17} aria-hidden="true" />
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          {!categoriesLoading && !categoriesError && selectedMainCategory && (
            <div className="mt-6 rounded-[1.35rem] border border-[#e3eadb] bg-white/80 p-4 shadow-[0_10px_28px_rgba(25,61,32,.045)] sm:mt-7 sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#679344]">Selected collection</p>
                  <h3 className="mt-1 font-heading text-xl font-semibold text-[#173b25] sm:text-2xl">{selectedMainCategory.name}</h3>
                </div>
                <button type="button" onClick={() => { setSelectedMainCategoryId(null); setSelectedSubcategoryId(null); }} className="rounded-full border border-[#dfe8d7] px-3.5 py-2 text-xs font-semibold text-[#557050] transition hover:border-[#a9ca81] hover:bg-[#f3f8ed]">
                  Show all categories
                </button>
              </div>
              {subcategories.length > 0 ? (
                <div className="grid grid-cols-1 min-[440px]:grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {subcategories.map((subcategory, index) => {
                    const SubcategoryIcon = getCategoryIcon(subcategory.slug);
                    const isSelected = selectedSubcategoryId === subcategory.id;
                    return (
                      <button key={subcategory.id} type="button" aria-pressed={isSelected}
                        onClick={() => setSelectedSubcategoryId((current) => current === subcategory.id ? null : subcategory.id)}
                        style={{ animationDelay: (index * 55) + "ms" }}
                        className={"product-reveal group relative flex min-h-[105px] items-center gap-3 overflow-hidden rounded-2xl border px-3 py-3 text-left transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(25,61,32,.09)] sm:min-h-[120px] sm:px-4 " + (isSelected ? "border-[#78b836] bg-[#eff7e7] shadow-[0_8px_22px_rgba(74,189,0,.12)]" : "border-[#e5eadd] bg-[#fbfcf8] hover:border-[#b9d49a]")}>
                        <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#e9f2df] text-[#4b8a30] sm:size-14">
                          {subcategory.image_url ? <img src={subcategory.image_url} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <SubcategoryIcon size={23} strokeWidth={1.5} aria-hidden="true" />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-heading text-sm font-semibold leading-snug text-[#23452c] sm:text-base">{subcategory.name}</span>
                          {subcategory.description && <span className="mt-1 line-clamp-2 block text-[11px] leading-4 text-[#768374] sm:text-xs">{subcategory.description}</span>}
                        </span>
                        <ArrowRight size={16} className={"shrink-0 transition " + (isSelected ? "translate-x-0.5 text-[#4b8a30]" : "text-[#8da17e] group-hover:translate-x-0.5")} aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="rounded-xl bg-[#f6f8f1] px-4 py-3 text-sm text-[#71806f]">There are no subcategories under this category yet. Products assigned to it are shown below.</p>
              )}
            </div>
          )}
        </section>

        <section
          aria-labelledby="all-products-title"
          className="mx-auto w-full min-w-0 max-w-[1440px] px-4 pb-10 sm:px-8 sm:pb-14 lg:px-12 lg:pb-20"
        >
          <div className="mb-6 flex flex-col gap-4 border-b border-[#e7e9dc] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-[#679344]">
                {selectedSubcategory ? selectedMainCategory?.name + " · Subcategory" : selectedMainCategory ? "Selected collection" : "The Save Eco range"}
              </p>
              <h2
                id="all-products-title"
                className="mt-1 break-words text-[clamp(1.5rem,7vw,1.875rem)] leading-tight tracking-[-.03em] sm:text-3xl"
              >
                <span className="saveeco-title-main">{selectedSubcategory?.name || selectedMainCategory?.name || "All"}</span> <span className="saveeco-title-accent">Products</span>
              </h2>
            </div>

            <label className="relative block w-full sm:max-w-[400px]">
              <span className="sr-only">Search products</span>
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#71806f]"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                className="h-12 w-full rounded-full border border-[#dfe5d8] bg-white pl-11 pr-4 text-sm text-[#23392a] shadow-sm outline-none transition placeholder:text-[#899387] focus:border-[#78b836] focus:ring-4 focus:ring-[#78b836]/10"
              />
            </label>
          </div>

          {isLoading && <ProductGridSkeleton count={8} />}

          {isError && (
            <div
              role="alert"
              className="rounded-2xl border border-[#f2d3cb] bg-[#fff5f1] px-5 py-4 text-sm text-[#a84431]"
            >
              Products could not be loaded. Please check the product connection
              and try again.
            </div>
          )}

          {!isLoading && !isError && filteredProducts.length === 0 && (
            <div className="rounded-2xl border border-[#e5e8dc] bg-white px-6 py-10 text-center shadow-sm">
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#eef5e5] text-[#4b8a30]">
                <Search size={20} aria-hidden="true" />
              </span>
              <p className="mt-3 text-xl"><span className="saveeco-title-main">No products</span> <span className="saveeco-title-accent">found</span></p>
              <p className="mt-1 text-sm text-[#71806f]">
                Try another search, or add active products in the admin panel.
              </p>
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="grid min-w-0 grid-cols-1 gap-3 min-[360px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="product-reveal min-w-0" style={{ animationDelay: `${index * 55}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}