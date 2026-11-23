import { FileText } from "lucide-react";
import PublicPageLayout from "../components/layout/PublicPageLayout";
import { useCertificates } from "../hooks/useCertificates";

const knownCertifications = [
  {
    title: "ISO 9001:2015",
    description: "Quality certification listed in the company PRD.",
  },
  {
    title: "APEDA Organic Certification",
    description: "Organic certification listed in the company PRD.",
  },
];

export default function Legal() {
  const { data: certificates = [], isLoading, isError } = useCertificates();

  return (
    <PublicPageLayout>
      <section className="bg-primary-light px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-site">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Legal and Certificates
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-ink">
            Company documents and certifications
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-site px-5 py-12 sm:px-8">
        {isLoading && <p className="text-sm text-muted">Loading certificates...</p>}

        {isError && (
          <p className="rounded-lg bg-red-50 p-4 text-sm text-danger">
            Certificates could not be loaded.
          </p>
        )}

        {!isLoading && !isError && certificates.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {certificates.map((certificate) => (
              <article
                key={certificate.id}
                className="rounded-2xl border border-gray-100 p-6"
              >
                <FileText className="text-primary" size={28} aria-hidden="true" />
                <h2 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {certificate.title}
                </h2>
                {certificate.issuer && (
                  <p className="mt-2 text-sm text-muted">
                    Issuer: {certificate.issuer}
                  </p>
                )}
                {certificate.number && (
                  <p className="mt-1 text-sm text-muted">
                    Certificate number: {certificate.number}
                  </p>
                )}
                {certificate.pdf_url && (
                  <a
                    href={certificate.pdf_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-sm font-semibold text-primary"
                  >
                    Download PDF
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          !isLoading &&
          !isError && (
            <div className="grid gap-5 sm:grid-cols-2">
              {knownCertifications.map((certificate) => (
                <article
                  key={certificate.title}
                  className="rounded-2xl border border-gray-100 p-6"
                >
                  <FileText className="text-primary" size={28} aria-hidden="true" />
                  <h2 className="mt-4 font-heading text-lg font-semibold text-ink">
                    {certificate.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {certificate.description}
                  </p>
                </article>
              ))}
            </div>
          )
        )}
      </section>
    </PublicPageLayout>
  );
}