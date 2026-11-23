import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import ProductSearch from "../components/products/ProductSearch";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import TopBar from "../components/layout/TopBar";
import { useProducts } from "../hooks/useProducts";

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

  const categoryProducts = useMemo(() => {
    return products.filter((product) => {
      if (category === "upcoming") return product.is_upcoming;

      return (
        !product.is_upcoming &&
        (product.category?.slug === category ||
          product.category?.parent?.slug === category)
      );
    });
  }, [category, products]);

  const subcategories = useMemo(() => {
    const found = new Map<string, string>();

    categoryProducts.forEach((product) => {
      const item = product.category;

      if (item?.parent?.slug === category) {
        found.set(item.slug, item.name);
      }
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

      <main>
        <section className="bg-primary-light px-5 py-14 sm:px-8">
          <div className="mx-auto max-w-site">
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <Link to="/products" className="hover:text-primary">Products</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span aria-current="page">{categoryName}</span>
            </nav>

            <h1 className="mt-5 font-heading text-3xl font-semibold text-ink sm:text-4xl">
              {categoryName}
            </h1>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-site">
            <ProductSearch value={search} onChange={setSearch} />

            {subcategories.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2" aria-label="Subcategory filters">
                <button
                  type="button"
                  onClick={() => setSelectedSubcategory("all")}
                  className={`rounded-full px-4 py-2 text-sm ${
                    selectedSubcategory === "all"
                      ? "bg-primary text-white"
                      : "bg-primary-light text-primary-dark"
                  }`}
                >
                  All
                </button>

                {subcategories.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => setSelectedSubcategory(item.slug)}
                    className={`rounded-full px-4 py-2 text-sm ${
                      selectedSubcategory === item.slug
                        ? "bg-primary text-white"
                        : "bg-primary-light text-primary-dark"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <p className="mt-6 text-sm text-muted">Loading products...</p>
            )}

            {isError && (
              <p className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-danger">
                Products could not be loaded. Check the Supabase connection and
                product tables.
              </p>
            )}

            {!isLoading && !isError && visibleProducts.length === 0 && (
              <p className="mt-6 rounded-xl bg-cream p-6 text-sm text-muted">
                No products are available in this category yet.
              </p>
            )}

            {visibleProducts.length > 0 && (
              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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