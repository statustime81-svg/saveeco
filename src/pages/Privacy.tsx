import PublicPageLayout from "../components/layout/PublicPageLayout";
import { siteConfig } from "../lib/siteConfig";

export default function Privacy() {
  return (
    <PublicPageLayout>
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Privacy
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold text-ink">
          Privacy Policy
        </h1>

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          Draft for company review. Confirm the final policy wording, data
          retention period and service-provider details before launch.
        </div>

        <div className="mt-8 space-y-6 text-sm leading-7 text-muted">
          <section>
            <h2 className="font-heading text-lg font-semibold text-ink">
              Information submitted through forms
            </h2>
            <p className="mt-2">
              Contact and partner forms may request information such as name,
              phone number, email address and the message submitted by the
              visitor. Product enquiries may also identify the product being
              discussed.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-ink">
              Use of submitted information
            </h2>
            <p className="mt-2">
              Submitted information is intended to help Save Eco respond to
              contact, product and partner enquiries. Personal enquiry records
              are intended for authorized company administrators.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-ink">
              Privacy questions
            </h2>
            <p className="mt-2">
              Contact Save Eco Organic at{" "}
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