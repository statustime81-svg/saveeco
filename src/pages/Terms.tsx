import PublicPageLayout from "../components/layout/PublicPageLayout";
import { siteConfig } from "../lib/siteConfig";

export default function Terms() {
  return (
    <PublicPageLayout>
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Terms
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold text-ink">
          Terms and Conditions
        </h1>

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          Draft for company review. Get the final terms approved before
          publishing the website.
        </div>

        <div className="mt-8 space-y-6 text-sm leading-7 text-muted">
          <section>
            <h2 className="font-heading text-lg font-semibold text-ink">
              Website information
            </h2>
            <p className="mt-2">
              This website provides company, category and product information
              and allows visitors to contact Save Eco Organic. The Phase 1
              website does not provide online checkout or payment.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-ink">
              Product information
            </h2>
            <p className="mt-2">
              Product details, pack sizes, prices and usage information should
              be read from the current product page and product label. For
              product-specific questions, contact Save Eco before use.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-ink">
              Contact
            </h2>
            <p className="mt-2">
              Questions about these terms can be sent to{" "}
              <a
                className="font-semibold text-primary"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </PublicPageLayout>
  );
}