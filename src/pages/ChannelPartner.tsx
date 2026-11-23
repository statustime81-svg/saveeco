import ChannelPartnerForm from "../components/forms/ChannelPartnerForm";
import PublicPageLayout from "../components/layout/PublicPageLayout";

export default function ChannelPartner() {
  return (
    <PublicPageLayout>
      <section className="bg-primary-light px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-site">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Channel Partner
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-ink">
            Send a partner enquiry
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted">
            Share your business and contact details so the company team can
            review your enquiry.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <div className="rounded-2xl border border-gray-100 p-6 sm:p-8">
          <ChannelPartnerForm />
        </div>
      </section>
    </PublicPageLayout>
  );
}