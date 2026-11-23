import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "../components/forms/ContactForm";
import PublicPageLayout from "../components/layout/PublicPageLayout";
import { siteConfig } from "../lib/siteConfig";

export default function Contact() {
  const mapQuery = encodeURIComponent(siteConfig.address);

  return (
    <PublicPageLayout>
      <section className="bg-primary-light px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-site">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Contact
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-ink">
            Let’s work together
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-site gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-ink">
            Get in touch
          </h2>

          <ul className="mt-6 space-y-5 text-sm leading-6 text-muted">
            <li className="flex gap-3">
              <Phone className="mt-1 shrink-0 text-primary" size={18} />
              <a href={`tel:${siteConfig.phonePrimary}`}>
                {siteConfig.phonePrimary} / {siteConfig.phoneSecondary}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-1 shrink-0 text-primary" size={18} />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-1 shrink-0 text-primary" size={18} />
              <span>{siteConfig.address}</span>
            </li>
          </ul>

          <iframe
            title="Save Eco Organic location map"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="mt-8 h-72 w-full rounded-2xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="font-heading text-2xl font-semibold text-ink">
            Send a message
          </h2>
          <p className="mb-6 mt-2 text-sm leading-6 text-muted">
            Fill in the form and the Save Eco team can respond to your enquiry.
          </p>
          <ContactForm />
        </div>
      </section>
    </PublicPageLayout>
  );
}