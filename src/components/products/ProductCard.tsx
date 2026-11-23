import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/app";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price);
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0];
  const categorySlug = product.category?.slug;

  const detailPath = categorySlug
    ? `/products/${categorySlug}/${product.slug}`
    : `/products`;

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link
        to={detailPath}
        className="block"
        aria-label={`View ${product.name} details`}
      >
        <div className="grid aspect-[4/3] place-items-center bg-primary-light">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <Leaf className="text-primary" size={42} aria-hidden="true" />
          )}
        </div>

        <div className="p-5">
          {product.category?.name && (
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {product.category.name}
            </p>
          )}

          <h2 className="mt-2 font-heading text-lg font-semibold text-ink">
            {product.name}
          </h2>

          {product.short_description && (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
              {product.short_description}
            </p>
          )}

          {product.pack_sizes && product.pack_sizes.length > 0 && (
            <p className="mt-3 text-xs text-muted">
              Pack sizes: {product.pack_sizes.join(", ")}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between gap-3">
            {product.show_price && product.price != null ? (
              <span className="font-semibold text-ink">
                {formatPrice(product.price)}
              </span>
            ) : (
              <span className="text-sm font-medium text-primary">
                Enquire for details
              </span>
            )}

            <span className="text-sm font-semibold text-primary">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}