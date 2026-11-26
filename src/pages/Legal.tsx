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
      <section className="bg-[#eff8e7] px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-site">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#398e17]">
            Legal and Certificates
          </p>

          <h1 className="mt-4 leading-[0.98] tracking-[-0.045em]">
            <span className="saveeco-title-main block text-[clamp(2.5rem,5vw,4.5rem)]">
              Company documents and
            </span>
            <span className="saveeco-title-accent block text-[clamp(2.4rem,4.7vw,4.2rem)]">
              certifications
            </span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-site px-5 py-12 sm:px-8 sm:py-16">
        {isLoading && (
          <p className="text-sm text-[#657363]">Loading certificates...</p>
        )}

        {isError && (
          <p className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            Certificates could not be loaded.
          </p>
        )}

        {!isLoading && !isError && certificates.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            {certificates.map((certificate) => (
              <article
                key={certificate.id}
                className="rounded-3xl border border-[#e2eadb] bg-white p-6 shadow-[0_12px_35px_rgba(20,59,32,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#b8d99e] hover:shadow-[0_18px_42px_rgba(20,59,32,0.10)] sm:p-8"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-[#eff8e7] text-[#398e17]">
                  <FileText size={25} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <h2 className="mt-5 font-heading text-xl font-semibold leading-snug text-[#143b20] sm:text-2xl">
                  {certificate.title}
                </h2>

                {certificate.issuer && (
                  <p className="mt-3 text-sm leading-6 text-[#657363]">
                    <span className="font-semibold text-[#398e17]">
                      Issuer:{" "}
                    </span>
                    {certificate.issuer}
                  </p>
                )}

                {certificate.number && (
                  <p className="mt-1 text-sm leading-6 text-[#657363]">
                    <span className="font-semibold text-[#398e17]">
                      Certificate number:{" "}
                    </span>
                    {certificate.number}
                  </p>
                )}

                {certificate.pdf_url && (
                  <a
                    href={certificate.pdf_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-block font-semibold text-[#398e17] transition hover:text-[#245f1d]"
                  >
                    Download PDF
                    <span aria-hidden="true"> ↗</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        )}

        {!isLoading && !isError && certificates.length === 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            {knownCertifications.map((certificate) => (
              <article
                key={certificate.title}
                className="rounded-3xl border border-[#e2eadb] bg-white p-6 shadow-[0_12px_35px_rgba(20,59,32,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#b8d99e] hover:shadow-[0_18px_42px_rgba(20,59,32,0.10)] sm:p-8"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-[#eff8e7] text-[#398e17]">
                  <FileText size={25} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <h2 className="mt-5 font-heading text-xl font-semibold leading-snug text-[#143b20] sm:text-2xl">
                  {certificate.title}
                </h2>

                <p className="mt-3 max-w-lg text-sm leading-7 text-[#657363]">
                  {certificate.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </PublicPageLayout>
  );
}