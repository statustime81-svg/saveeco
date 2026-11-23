import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import PublicPageLayout from "../components/layout/PublicPageLayout";

const steps = [
  "Choose Direct Partner or Channel Partner.",
  "Submit the relevant registration or enquiry details.",
  "The company reviews the submitted information and follows up.",
];

const partnerOptions = [
  {
    title: "Direct Partner",
    description:
      "Use the Direct Partner registration path and provide your contact details.",
    benefits: [
      "Direct partner registration route",
      "Access to company and product information",
      "Contact path for registration questions",
    ],
    href: "/join/direct",
  },
  {
    title: "Channel Partner",
    description:
      "Submit your firm and contact information through the Channel Partner form.",
    benefits: [
      "In-site partner enquiry form",
      "Firm and location details captured",
      "Company team can review the enquiry",
    ],
    href: "/join/channel",
  },
];

export default function Join() {
  return (
    <PublicPageLayout>
      <section className="bg-primary-light px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-site">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Join Save Eco
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-ink">
            Become a partner
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted">
            Review the two partner paths and choose the one that fits your
            enquiry. This page does not make income or earning claims.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-site px-5 py-12 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {partnerOptions.map((option) => (
            <article
              key={option.title}
              className="rounded-2xl border border-gray-100 p-6 sm:p-8"
            >
              <h2 className="font-heading text-2xl font-semibold text-ink">
                {option.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {option.description}
              </p>

              <ul className="mt-5 space-y-3">
                {option.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-sm text-ink">
                    <Check size={17} className="shrink-0 text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link
                to={option.href}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                Continue <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-cream p-6">
          <h2 className="font-heading text-xl font-semibold text-ink">
            How it works
          </h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step} className="rounded-xl bg-white p-4 text-sm leading-6 text-muted">
                <span className="font-semibold text-primary">
                  Step {index + 1}
                </span>
                <p className="mt-2">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PublicPageLayout>
  );
}