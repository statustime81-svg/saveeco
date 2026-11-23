import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MessageCircle, Phone } from "lucide-react";
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

export default function ProductDetail() {
  const { slug = "" } = useParams();
  const { data: products = [], isLoading, isError } = useProducts();
  const product = products.find((item) => item.slug === slug);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const related = product ? products.filter((item) => item.id !== product.id && item.category?.slug === product.category?.slug).slice(0, 3) : [];
  const whatsAppHref = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello Save Eco, I would like to know more about ${product?.name ?? "your products"}.`)}`
    : undefined;

  return <>
    {product && <SEOHead title={product.name} description={product.short_description || product.description || `Learn about ${product.name} from Save Eco Organic.`} path={`/products/${product.category?.slug ?? "products"}/${product.slug}`} />}
    <TopBar /><Navbar />
    <main>
      {isLoading && <p className="mx-auto max-w-site px-5 py-16 text-muted">Loading product…</p>}
      {isError && <p role="alert" className="mx-auto max-w-site px-5 py-16 text-danger">Product details could not be loaded. Check the Supabase connection.</p>}
      {!isLoading && !isError && !product && <section className="mx-auto max-w-site px-5 py-16"><h1 className="font-heading text-2xl font-semibold text-ink">Product not found</h1><Link to="/products" className="mt-4 inline-block font-semibold text-primary">Back to products</Link></section>}
      {product && <>
        <section className="bg-primary-light px-5 py-8 sm:px-8"><nav aria-label="Breadcrumb" className="mx-auto max-w-site text-sm text-muted"><Link to="/" className="hover:text-primary">Home</Link><span className="mx-2">/</span><Link to="/products" className="hover:text-primary">Products</Link><span className="mx-2">/</span><Link to={`/products/${product.category?.slug ?? ""}`} className="hover:text-primary">{product.category?.name ?? "Category"}</Link><span className="mx-2">/</span><span aria-current="page">{product.name}</span></nav></section>
        <section className="mx-auto grid max-w-site gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:py-16">
          <ProductGallery images={product.images} name={product.name} />
          <div>
            {product.category?.name && <Badge>{product.category.name}</Badge>}
            <h1 className="mt-4 font-heading text-3xl font-semibold text-ink sm:text-4xl">{product.name}</h1>
            {product.short_description && <p className="mt-4 leading-7 text-muted">{product.short_description}</p>}
            {product.show_price && product.price != null && <p className="mt-5 text-xl font-semibold text-ink">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(product.price)}</p>}
            <div className="mt-6 flex flex-wrap gap-3">
              {!product.is_upcoming && <button type="button" onClick={() => setEnquiryOpen(true)} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark">Enquire Now</button>}
              <a href={`tel:${siteConfig.phonePrimary}`} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary px-5 py-3 text-sm font-semibold text-primary"><Phone size={16} />Call</a>
              {whatsAppHref && <a href={whatsAppHref} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-green-600 px-5 py-3 text-sm font-semibold text-green-700"><MessageCircle size={16} />WhatsApp</a>}
            </div>
            {product.is_upcoming && <div className="mt-6"><UpcomingProductNotifyForm productName={product.name} /></div>}
            {product.description && <div className="mt-8"><h2 className="font-heading text-lg font-semibold text-ink">About this product</h2><p className="mt-2 whitespace-pre-line text-sm leading-7 text-muted">{product.description}</p></div>}
            {product.benefits && product.benefits.length > 0 && <div className="mt-7"><h2 className="font-heading text-lg font-semibold text-ink">Key Benefits</h2><ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-6 text-muted">{product.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></div>}
            {product.how_to_use && <div className="mt-7"><h2 className="font-heading text-lg font-semibold text-ink">How to Use</h2><p className="mt-2 text-sm leading-6 text-muted">{product.how_to_use}</p></div>}
            {product.dosage && product.dosage.length > 0 && <div className="mt-7"><h2 className="font-heading text-lg font-semibold text-ink">Dosage and Application</h2><div className="mt-3 overflow-x-auto rounded-xl border border-gray-200"><table className="w-full text-left text-sm"><thead className="bg-cream text-ink"><tr><th className="p-3">Crop / Application</th><th className="p-3">Dose</th><th className="p-3">Frequency</th></tr></thead><tbody>{product.dosage.map((item, index) => <tr key={index} className="border-t border-gray-100"><td className="p-3 text-muted">{item.crop || item.application || "—"}</td><td className="p-3 text-muted">{item.dose || "—"}</td><td className="p-3 text-muted">{item.frequency || "—"}</td></tr>)}</tbody></table></div></div>}
            {product.pack_sizes && product.pack_sizes.length > 0 && <div className="mt-7"><h2 className="font-heading text-lg font-semibold text-ink">Pack Sizes</h2><div className="mt-3 flex flex-wrap gap-2">{product.pack_sizes.map((size) => <Badge key={size}>{size}</Badge>)}</div></div>}
            <p className="mt-7 rounded-xl bg-cream p-4 text-sm leading-6 text-muted">Follow the instructions and safety information printed on the product label.</p>
          </div>
        </section>
        {related.length > 0 && <section className="bg-cream px-5 py-12 sm:px-8"><div className="mx-auto max-w-site"><h2 className="font-heading text-2xl font-semibold text-ink">Related products</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></div></section>}
        <EnquiryModal open={enquiryOpen} productName={product.name} onClose={() => setEnquiryOpen(false)} />
      </>}
    </main>
    <Footer />
  </>;
}
