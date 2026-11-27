import { ArrowUpRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/app";

type ProductCardProps = {
  product: Product;
  variant?: "default" | "compact";
};

export default function ProductCard({
  product,
  variant = "default",
}: ProductCardProps) {
  const isCompact = variant === "compact";
  const imageUrl = product.images?.[0];
  const categorySlug = product.category?.slug;

  // The detail route only needs the product slug; use a fallback route when a
  // product has no category assigned so the card never points back to the list.
  const detailPath = categorySlug
    ? "/products/" + categorySlug + "/" + product.slug
    : "/products/item/" + product.slug;

  return (
    <article
      className={
        "product-card group h-full overflow-hidden border border-[#e5e9dc] bg-[#fffefa] transition duration-300 hover:-translate-y-1 hover:border-[#b8d593] hover:shadow-[0_16px_32px_rgba(24,62,31,.12)] " +
        (isCompact
          ? "rounded-2xl shadow-[0_6px_18px_rgba(24,62,31,.055)]"
          : "rounded-[1.35rem] shadow-[0_10px_28px_rgba(24,62,31,.07)] hover:-translate-y-1.5 hover:shadow-[0_20px_42px_rgba(24,62,31,.14)]")
      }
    >
      <Link
        to={detailPath}
        className="flex h-full flex-col"
        aria-label={"View " + product.name + " details"}
      >
        <div
          className={
            "product-card__image relative grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_30%,#ffffff,#edf5e5_75%)] " +
            (isCompact ? "aspect-[4/3] sm:aspect-[1.55/1]" : "aspect-square sm:aspect-[4/3]")
          }
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.02] sm:p-3"
              loading="lazy"
            />
          ) : (
            <Leaf
              className={isCompact ? "text-[#4abd00]" : "text-[#4abd00]"}
              size={isCompact ? 30 : 42}
              aria-hidden="true"
            />
          )}

          {product.is_upcoming && (
            <span
              className={
                "absolute left-3 top-3 rounded-full border border-white/70 bg-[#143b20]/90 font-bold uppercase text-white shadow-sm " +
                (isCompact
                  ? "px-2 py-1 text-[.52rem] tracking-[.1em]"
                  : "left-4 top-4 px-3 py-1 text-[.62rem] tracking-[.14em]")
              }
            >
              Coming soon
            </span>
          )}

          {product.category?.name && (
            <span
              className={
                "absolute bottom-2 left-2 max-w-[calc(100%-1rem)] truncate rounded-full border border-white/75 bg-white/90 font-bold uppercase text-[#39732c] shadow-sm backdrop-blur " +
                (isCompact
                  ? "px-2.5 py-1 text-[.52rem] tracking-[.08em]"
                  : "bottom-3 left-3 px-3 py-1 text-[.62rem] tracking-[.1em]")
              }
            >
              {product.category.name}
            </span>
          )}
        </div>

        <div
          className={
            "flex flex-1 flex-col " +
            (isCompact ? "p-3 sm:p-3.5" : "p-4 sm:p-5")
          }
        >
          <h2
            className={
              "min-w-0 break-words font-heading font-semibold leading-snug text-[#143b20] transition-colors group-hover:text-[#3f8124] " +
              (isCompact ? "text-sm sm:text-base" : "text-lg sm:text-xl")
            }
          >
            {product.name}
          </h2>

          {product.short_description && (
            <p
              className={
                "min-w-0 break-words text-[#667365] " +
                (isCompact
                  ? "mt-1.5 line-clamp-2 text-xs leading-5"
                  : "mt-2 line-clamp-3 text-sm leading-6")
              }
            >
              {product.short_description}
            </p>
          )}

          {product.pack_sizes && product.pack_sizes.length > 0 && (
            <p
              className={
                "text-[#71806f] " +
                (isCompact
                  ? "mt-2 text-[.65rem] leading-4"
                  : "mt-3 text-xs leading-5")
              }
            >
              Pack sizes: {product.pack_sizes.join(", ")}
            </p>
          )}

          <div
            className={
              "mt-auto flex items-center justify-between gap-2 border-t border-[#edf0e8] " +
              (isCompact ? "pt-2.5" : "gap-3 pt-4")
            }
          >
            <span
              className={
                "font-semibold text-[#39732c] " +
                (isCompact ? "text-[.68rem] leading-4" : "text-sm")
              }
            >
              {product.is_upcoming
                ? "View product details"
                : "View details & enquire"}
            </span>
            <span
              className={
                "grid shrink-0 place-items-center rounded-full bg-[#eaf5df] text-[#28652c] transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-[#4abd00] group-hover:text-[#143b20] " +
                (isCompact ? "size-7" : "size-9")
              }
            >
              <ArrowUpRight size={isCompact ? 15 : 18} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
