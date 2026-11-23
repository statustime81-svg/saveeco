import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductSearch from "../components/products/ProductSearch";
import ProductCard from "../components/products/ProductCard";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import TopBar from "../components/layout/TopBar";
import { useProducts } from "../hooks/useProducts";

const categories = [
  { slug: "agri", name: "Agricultural Products" },
  { slug: "veterinary", name: "Veterinary Products" },
  { slug: "wellness", name: "Wellness Products" },
  { slug: "personal-care", name: "Personal Care Products" },
  { slug: "upcoming", name: "Upcoming Products" },
];

export default function Products() {
  const [search, setSearch] = useState("");
  const { data: products = [], isLoading, isError } = useProducts();

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.short_description?.toLowerCase().includes(normalizedSearch);

      return matchesSearch;
    });
  }, [products, search]);

  return (
    <>
      <TopBar />
      <Navbar />

      <main>
        <section className="bg-primary-light px-5 py-14 sm:px-8">
          <div className="mx-auto max-w-site">
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span aria-current="page">Products</span>
            </nav>

            <h1 className="mt-5 font-heading text-3xl font-semibold text-ink sm:text-4xl">
              Product Categories
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              Choose a category to explore its products and product details.
            </p>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-site">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/products/${category.slug}`}
                  className="rounded-xl border border-gray-200 p-5 font-semibold text-ink transition hover:border-primary hover:bg-primary-light"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="mt-10 max-w-xl">
              <ProductSearch value={search} onChange={setSearch} />
            </div>

            <h2 className="mt-10 font-heading text-2xl font-semibold text-ink">
              All Products
            </h2>

            {isLoading && (
              <p className="mt-6 text-sm text-muted">Loading products...</p>
            )}

            {isError && (
              <p className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-danger">
                Products could not be loaded. Check the Supabase connection and
                product tables.
              </p>
            )}

            {!isLoading && !isError && filteredProducts.length === 0 && (
              <p className="mt-6 rounded-xl bg-cream p-6 text-sm text-muted">
                No matching products are available yet.
              </p>
            )}

            {filteredProducts.length > 0 && (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
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