import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import ProductSearch from "../components/products/ProductSearch";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import TopBar from "../components/layout/TopBar";
import { useProducts } from "../hooks/useProducts";
import { ProductGridSkeleton } from "../components/ui/SaveEcoSkeleton";

const categoryNames: Record<string, string> = {
  agri: "Agricultural Products",
  veterinary: "Veterinary Products",
  wellness: "Wellness Products",
  "personal-care": "Personal Care Products",
  upcoming: "Upcoming Products",
};

export default function ProductCategory() {
  const { category = "" } = useParams();
  const [search, setSearch] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const { data: products = [], isLoading, isError } = useProducts();
  const categoryName = categoryNames[category] ?? "Products";

  const categoryProducts = useMemo(
    () =>
      products.filter((product) => {
        if (category === "upcoming") return product.is_upcoming;
        return (
          !product.is_upcoming &&
          (product.category?.slug === category ||
            product.category?.parent?.slug === category)
        );
      }),
    [category, products],
  );

  const subcategories = useMemo(() => {
    const found = new Map<string, string>();
    categoryProducts.forEach((product) => {
      const item = product.category;
      if (item?.parent?.slug === category) found.set(item.slug, item.name);
    });
    return Array.from(found, ([slug, name]) => ({ slug, name }));
  }, [category, categoryProducts]);

  const visibleProducts = categoryProducts.filter((product) => {
    const matchesSubcategory =
      selectedSubcategory === "all" ||
      product.category?.slug === selectedSubcategory;
    const term = search.trim().toLowerCase();
    const matchesSearch =
      !term ||
      product.name.toLowerCase().includes(term) ||
      product.short_description?.toLowerCase().includes(term);
    return matchesSubcategory && matchesSearch;
  });

  return (
    <>
      <TopBar />
      <Navbar />

      <main className="product-page min-w-0 overflow-x-hidden bg-[#fbfaf5] font-body text-[#173b25]">
        <section className="border-b border-[#e8eddf] bg-[#f1f6e9] px-5 py-10 sm:px-8 sm:py-12">
          <div className="mx-auto max-w-site">
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <Link to="/products" className="hover:text-primary">Products</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span aria-current="page">{categoryName}</span>
            </nav>

            <h1 className="product-reveal mt-5 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] tracking-[-.04em]">
              <span className="saveeco-title-main">
                {categoryName.split(" ").slice(0, -1).join(" ") || categoryName}
              </span>{" "}
              {categoryName.includes(" ") && (
                <span className="saveeco-title-accent">
                  {categoryName.split(" ").slice(-1)[0]}
                </span>
              )}
            </h1>
          </div>
        </section>

        <section className="px-4 py-7 sm:px-8 sm:py-10 lg:py-14">
          <div className="mx-auto w-full min-w-0 max-w-site">
            <ProductSearch value={search} onChange={setSearch} />

            {subcategories.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 sm:mt-5" aria-label="Subcategory filters">
                <button
                  type="button"
                  onClick={() => setSelectedSubcategory("all")}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${
                    selectedSubcategory === "all"
                      ? "border-[#4abd00] bg-[#4abd00] text-[#143b20] shadow-[0_6px_15px_rgba(74,189,0,.18)]"
                      : "border-[#e2e9da] bg-white text-[#526356] hover:border-[#a9ca81] hover:bg-[#f3f8ed]"
                  }`}
                >
                  All
                </button>
                {subcategories.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => setSelectedSubcategory(item.slug)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${
                      selectedSubcategory === item.slug
                        ? "border-[#4abd00] bg-[#4abd00] text-[#143b20] shadow-[0_6px_15px_rgba(74,189,0,.18)]"
                        : "border-[#e2e9da] bg-white text-[#526356] hover:border-[#a9ca81] hover:bg-[#f3f8ed]"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}

            {isLoading && <ProductGridSkeleton count={8} className="mt-7" />}
            {isError && (
              <p className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-danger">
                Products could not be loaded. Check the Supabase connection and product tables.
              </p>
            )}
            {!isLoading && !isError && visibleProducts.length === 0 && (
              <p className="mt-6 rounded-xl bg-cream p-6 text-sm text-muted">
                No products are available in this category yet.
              </p>
            )}
            {visibleProducts.length > 0 && (
              <div className="mt-6 grid min-w-0 grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:mt-7 lg:grid-cols-3 xl:grid-cols-4">
                {visibleProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="product-reveal min-w-0"
                    style={{ animationDelay: `${index * 55}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
