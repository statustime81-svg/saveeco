import "./SaveEcoSkeleton.css";

type SkeletonProps = {
  count?: number;
  className?: string;
};

function ProductCardSkeleton() {
  return (
    <article className="saveeco-skeleton-card" aria-hidden="true">
      <div className="saveeco-skeleton saveeco-skeleton--product-image" />
      <div className="saveeco-skeleton-card__body">
        <div className="saveeco-skeleton saveeco-skeleton--tag" />
        <div className="saveeco-skeleton saveeco-skeleton--title" />
        <div className="saveeco-skeleton saveeco-skeleton--copy" />
        <div className="saveeco-skeleton saveeco-skeleton--copy saveeco-skeleton--copy-short" />
        <div className="saveeco-skeleton-card__footer">
          <div className="saveeco-skeleton saveeco-skeleton--link" />
          <div className="saveeco-skeleton saveeco-skeleton--icon" />
        </div>
      </div>
    </article>
  );
}

export function ProductGridSkeleton({
  count = 8,
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`saveeco-product-skeleton-grid ${className}`}
      role="status"
      aria-label="Loading products"
    >
      <span className="saveeco-sr-only">Loading products…</span>
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function CategoryGridSkeleton({ count = 5 }: SkeletonProps) {
  return (
    <div
      className="saveeco-category-skeleton-grid"
      role="status"
      aria-label="Loading product categories"
    >
      <span className="saveeco-sr-only">Loading product categories…</span>
      {Array.from({ length: count }, (_, index) => (
        <div className="saveeco-category-skeleton" aria-hidden="true" key={index}>
          <span className="saveeco-skeleton saveeco-category-skeleton__number" />
          <span className="saveeco-category-skeleton__bottom">
            <span className="saveeco-skeleton saveeco-category-skeleton__line" />
            <span className="saveeco-skeleton saveeco-category-skeleton__line saveeco-category-skeleton__line--short" />
          </span>
          <span className="saveeco-skeleton saveeco-category-skeleton__icon" />
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <section
      className="saveeco-detail-skeleton"
      role="status"
      aria-label="Loading product details"
    >
      <span className="saveeco-sr-only">Loading product details…</span>
      <div className="saveeco-skeleton saveeco-detail-skeleton__image" aria-hidden="true" />
      <div className="saveeco-detail-skeleton__content" aria-hidden="true">
        <div className="saveeco-skeleton saveeco-skeleton--tag" />
        <div className="saveeco-skeleton saveeco-detail-skeleton__title" />
        <div className="saveeco-skeleton saveeco-detail-skeleton__line" />
        <div className="saveeco-skeleton saveeco-detail-skeleton__line saveeco-detail-skeleton__line--short" />
        <div className="saveeco-detail-skeleton__actions">
          <div className="saveeco-skeleton saveeco-detail-skeleton__button" />
          <div className="saveeco-skeleton saveeco-detail-skeleton__button saveeco-detail-skeleton__button--light" />
        </div>
      </div>
    </section>
  );
}
