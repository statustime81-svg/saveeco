import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Badge from "../components/ui/Badge";
import ProductGallery from "../components/products/ProductGallery";
import EnquiryModal from "../components/products/EnquiryModal";
import UpcomingProductNotifyForm from "../components/forms/UpcomingProductNotifyForm";
import ProductCard from "../components/products/ProductCard";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import TopBar from "../components/layout/TopBar";
import { useProducts } from "../hooks/useProducts";
import { siteConfig } from "../lib/siteConfig";
import SEOHead from "../lib/seo";
import productDetailBackground from "../assets/product-detail-background.png";
import { ProductDetailSkeleton } from "../components/ui/SaveEcoSkeleton";

export default function ProductDetail() {
  const { slug = "" } = useParams();
  const { data: products = [], isLoading, isError } = useProducts();
  const product = products.find((item) => item.slug === slug);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const related = product?.category?.slug
    ? products
        .filter(
          (item) =>
            item.id !== product.id &&
           item.category?.slug === product.category?.slug,
        )
        .slice(0, 4)
    : [];
  const titleWords = product?.name.trim().split(/\s+/) ?? [];
  const whatsAppHref = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello Save Eco, I would like to know more about ${product?.name ?? "your products"}.`)}`
    : undefined;

  return (
    <>
      {product && (
        <SEOHead
          title={product.name}
          description={
            product.short_description ||
            product.description ||
            `Learn about ${product.name} from Save Eco Organic.`
          }
          path={`/products/${product.category?.slug ?? "products"}/${product.slug}`}
        />
      )}
      <TopBar />
      <Navbar />
      <main className="min-w-0 overflow-x-hidden bg-[#f8f8f1] font-body text-[#173b25]">
        {isLoading && <ProductDetailSkeleton />}
        {isError && (
          <p
            role="alert"
            className="mx-auto max-w-[1240px] px-5 py-20 text-red-700"
          >
            Product details could not be loaded. Check the Supabase connection.
          </p>
        )}
        {!isLoading && !isError && !product && (
          <section className="mx-auto max-w-[1240px] px-5 py-20">
            <h1 className="text-3xl">
              <span className="saveeco-title-main">Product</span>{" "}
              <span className="saveeco-title-accent">not found</span>
            </h1>
            <Link
              to="/products"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-[#347d25] hover:text-[#4abd00]"
            >
              <ArrowLeft size={17} aria-hidden="true" /> Back to products
            </Link>
          </section>
        )}

        {product && (
          <>
            <section className="border-b border-[#e7ecdf] bg-[#eff5e7] px-4 py-3 sm:px-8 sm:py-4">
              <nav
                aria-label="Breadcrumb"
                className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-2 text-xs text-[#71806f] sm:text-sm"
              >
                <Link to="/" className="transition hover:text-[#287127]">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <Link
                  to="/products"
                  className="transition hover:text-[#287127]"
                >
                  Products
                </Link>
                <span aria-hidden="true">/</span>
                <Link
                  to={`/products/${product.category?.slug ?? ""}`}
                  className="transition hover:text-[#287127]"
                >
                  {product.category?.name ?? "Category"}
                </Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page" className="font-semibold text-[#173b25]">
                  {product.name}
                </span>
              </nav>
            </section>

            <section
              className="relative isolate min-w-0 overflow-hidden bg-[#eff5e7] bg-cover bg-center px-4 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-6"
              style={{ backgroundImage: `linear-gradient(90deg, rgba(239,245,231,.32), rgba(250,249,239,.20)), url(${productDetailBackground})` }}
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-0 -z-0 size-72 rounded-full bg-[#dceecb]/55 blur-3xl" />
              <div className="relative mx-auto grid w-full min-w-0 max-w-[1320px] items-center gap-4 sm:gap-5 lg:grid-cols-[.95fr_1.05fr] lg:gap-10">
                <div className="product-reveal overflow-hidden rounded-[1.4rem] bg-white/35 p-2 sm:rounded-[1.7rem] sm:p-2.5">
                  <ProductGallery images={product.images} name={product.name} />
                </div>

                <div className="product-reveal py-1 sm:py-2 lg:py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {product.category?.name && <Badge>{product.category.name}</Badge>}
                    {product.is_upcoming && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/75 px-3 py-1.5 text-[11px] font-bold text-[#477f2d]">
                        <Sparkles size={13} aria-hidden="true" /> Coming soon
                      </span>
                    )}
                  </div>
                  <p className="mt-5 inline-flex items-center gap-2 text-[.62rem] font-bold uppercase tracking-[.2em] text-[#56813e]">
                    <span className="h-px w-7 bg-[#77b936]" /> Save Eco Organic
                  </p>
                  <h1 className="mt-2 max-w-[720px] break-words text-[clamp(1.9rem,8vw,3.65rem)] leading-[1.02] tracking-[-.04em] sm:text-[clamp(2.15rem,4.2vw,3.65rem)]">
                    <span className="saveeco-title-main">{titleWords[0]}</span>
                    {titleWords.length > 1 && (
                      <>
                        {" "}
                        <span className="saveeco-title-accent">{titleWords.slice(1).join(" ")}</span>
                      </>
                    )}
                  </h1>
                  {product.short_description && (
                    <p className="mt-4 max-w-[620px] text-sm leading-6 text-[#5f6e5e] sm:text-[.95rem] sm:leading-7">
                      {product.short_description}
                    </p>
                  )}
                  {product.pack_sizes && product.pack_sizes.length > 0 && (
                    <div className="mt-5 flex items-center gap-2 border-b border-[#dfe8d7] pb-4 text-[11px] font-bold uppercase tracking-[.12em] text-[#71806f]">
                      <PackageCheck size={16} className="text-[#57943a]" aria-hidden="true" />
                      {product.pack_sizes.length} pack size{product.pack_sizes.length > 1 ? "s" : ""} available
                    </div>
                  )}
                  {product.show_price && product.price !== null && product.price !== undefined && Number.isFinite(Number(product.price)) && (
                    <div className="mt-4 flex items-baseline gap-2" aria-label={`Price ${new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(product.price))}`}>
                      <span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#75816f]">Price</span>
                      <span className="font-heading text-2xl font-semibold tracking-[-.03em] text-[#17652b] sm:text-[1.75rem]">
                        {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(product.price))}
                      </span>
                    </div>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" onClick={() => setEnquiryOpen(true)} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#4abd00] px-4 text-xs font-bold text-[#143b20] shadow-[0_7px_18px_rgba(74,189,0,.17)] transition hover:-translate-y-0.5 hover:bg-[#43ad00] sm:min-h-11 sm:px-5 sm:text-sm">
                      Enquire Now <ArrowRight size={15} aria-hidden="true" />
                    </button>
                    <a href={"tel:" + siteConfig.phonePrimary} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#cbd9bd] bg-white/80 px-3.5 text-xs font-semibold text-[#28652c] transition hover:border-[#83b950] hover:bg-white sm:min-h-11 sm:text-sm">
                      <Phone size={15} aria-hidden="true" /> Call
                    </a>
                    {whatsAppHref && (
                      <a href={whatsAppHref} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#cbd9bd] bg-white/80 px-3.5 text-xs font-semibold text-[#28652c] transition hover:border-[#83b950] hover:bg-white sm:min-h-11 sm:text-sm">
                        <MessageCircle size={15} aria-hidden="true" /> WhatsApp
                      </a>
                    )}
                  </div>
                  <p className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-[#788274]">
                    <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[#65a63a]" aria-hidden="true" />
                    Follow the instructions and safety information printed on the product label.
                  </p>
                </div>
              </div>
            </section>

            <section className="border-t border-[#e7ecdf] bg-[#fffefa] px-4 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <div className="mx-auto grid max-w-[1320px] items-start gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
                <div className="divide-y divide-[#e6ebdf]">
                  {product.description && (
                    <article className="pb-5 sm:pb-6">
                      <p className="text-[.6rem] font-bold uppercase tracking-[.18em] text-[#6d9650]">Product overview</p>
                      <h2 className="mt-1 text-2xl sm:text-[1.8rem]">
                        <span className="saveeco-title-main">About this</span>{" "}
                        <span className="saveeco-title-accent">product</span>
                      </h2>
                      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-[#627061]">{product.description}</p>
                    </article>
                  )}
                  {product.how_to_use && (
                    <article className="py-5 sm:py-6">
                      <h2 className="text-xl sm:text-2xl">
                        <span className="saveeco-title-main">How</span>{" "}
                        <span className="saveeco-title-accent">to use</span>
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-[#627061]">{product.how_to_use}</p>
                    </article>
                  )}
                  {product.pack_sizes && product.pack_sizes.length > 0 && (
                    <article className="pt-5 sm:pt-6">
                      <h2 className="text-xl sm:text-2xl">
                        <span className="saveeco-title-main">Available</span>{" "}
                        <span className="saveeco-title-accent">pack size</span>
                      </h2>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.pack_sizes.map((size) => <Badge key={size}>{size}</Badge>)}
                      </div>
                    </article>
                  )}
                </div>

                <div className="border-t border-[#e6ebdf] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  {product.benefits && product.benefits.length > 0 && (
                    <article>
                      <h2 className="text-2xl sm:text-[1.8rem]">
                        <span className="saveeco-title-main">Key</span>{" "}
                        <span className="saveeco-title-accent">benefits</span>
                      </h2>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {product.benefits.map((benefit) => (
                          <li key={benefit} className="flex min-h-14 items-start gap-2.5 rounded-xl bg-[#f3f6ec] px-3 py-2.5 text-xs leading-5 text-[#536153] sm:text-sm">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#e3f0d5] text-[#4a8c20]">
                              <Check size={12} strokeWidth={2.5} aria-hidden="true" />
                            </span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </article>
                  )}
                  {product.dosage && product.dosage.length > 0 && (
                    <article className="mt-6 border-t border-[#e6ebdf] pt-5">
                      <p className="text-[.6rem] font-bold uppercase tracking-[.18em] text-[#6d9650]">Product specification</p>
                      <div className="mt-2 divide-y divide-[#e6ebdf]">
                        {product.dosage.map((item, index) => (
                          <div key={index} className="grid gap-2 py-2.5 text-xs sm:grid-cols-[150px_1fr] sm:text-sm">
                            <span className="font-bold uppercase tracking-[.08em] text-[#31563a]">{item.crop || item.application || "Application"}</span>
                            <span className="text-[#627061]">{[item.dose, item.frequency].filter(Boolean).join(" · ") || "—"}</span>
                          </div>
                        ))}
                      </div>
                    </article>
                  )}
                </div>
              </div>

              {product.is_upcoming && (
                <div className="mx-auto mt-6 max-w-[1320px] rounded-xl border border-[#dce9cf] bg-[#f4f8ed] p-4 sm:p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-white text-[#4a8c20] shadow-sm"><Sparkles size={17} aria-hidden="true" /></span>
                    <div>
                      <p className="text-[.58rem] font-bold uppercase tracking-[.15em] text-[#6d9650]">Coming soon</p>
                      <h2 className="font-heading text-base font-semibold text-[#173b25]">Get launch updates</h2>
                    </div>
                  </div>
                  <UpcomingProductNotifyForm productName={product.name} />
                </div>
              )}
            </section>

            <EnquiryModal
              open={enquiryOpen}
              productName={product.name}
              onClose={() => setEnquiryOpen(false)}
            />
          </>
        )}
      </main>
      {product && related.length > 0 && (
        <section
          aria-labelledby="related-products-title"
          className="border-t border-[#e7ecdf] bg-[#fbfaf5] px-4 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
        >
          <div className="mx-auto max-w-[1160px]">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#6d9650]">
                  More from this collection
                </p>
                <h2 id="related-products-title" className="mt-1 text-2xl sm:text-3xl">
                  <span className="saveeco-title-main">Related</span>{" "}
                  <span className="saveeco-title-accent">products</span>
                </h2>
              </div>
              {product.category?.slug && (
                <Link
                  to={"/products/" + product.category.slug}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#347d25] transition hover:gap-2.5 hover:text-[#4abd00]"
                >
                  View all <ArrowRight size={15} aria-hidden="true" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {related.map((item, index) => (
                <div
                  key={item.id}
                  className="product-reveal"
                  style={{ animationDelay: (index * 55) + "ms" }}
                >
                  <ProductCard product={item} variant="compact" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
