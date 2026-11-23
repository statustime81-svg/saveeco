import DirectPartnerForm from "../components/forms/DirectPartnerForm";
import PublicPageLayout from "../components/layout/PublicPageLayout";
import { siteConfig } from "../lib/siteConfig";

export default function DirectPartner() {
  return (
    <PublicPageLayout>
      <section className="bg-primary-light px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-site">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Direct Partner
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-ink">
            Register your interest
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted">
            Submit your details for a follow-up, or continue to the existing
            Direct Partner registration portal.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-site gap-8 px-5 py-12 sm:px-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="font-heading text-xl font-semibold text-ink">
            Interest form
          </h2>
          <p className="mb-6 mt-2 text-sm text-muted">
            Fields marked by the form are required to submit your interest.
          </p>
          <DirectPartnerForm />
        </div>

        <aside className="rounded-2xl bg-cream p-6 sm:p-8">
          <h2 className="font-heading text-xl font-semibold text-ink">
            Already ready to register?
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Open the existing Save Eco Direct Partner registration page.
          </p>
          <a
            href={siteConfig.externalLinks.directPartnerJoin}
            className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Open registration
          </a>
        </aside>
      </section>
    </PublicPageLayout>
  );
}