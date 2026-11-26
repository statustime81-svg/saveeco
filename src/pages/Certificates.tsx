import { ArrowRight, Award, BadgeCheck, FileText, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import PublicPageLayout from "../components/layout/PublicPageLayout";
import { useCertificates } from "../hooks/useCertificates";
import SEOHead from "../lib/seo";

export default function Certificates() {
  const { data: certificates = [], isLoading, isError } = useCertificates();

  return (
    <PublicPageLayout>
      <SEOHead
        title="Quality and Certification"
        description="Read Save Eco Organic's published certificate information and view available certification documents."
        path="/certificates"
      />

      <section className="min-h-[62vh] overflow-hidden bg-[#f8fbf2] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1160px]">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-medium text-[#71806c] sm:text-sm">
            <Link to="/" className="transition hover:text-[#317d18]">Home</Link>
            <span className="mx-2 text-[#9bad7d]">/</span>
            <span aria-current="page" className="text-[#315b36]">Certifications</span>
          </nav>

          <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <p className="inline-flex items-center gap-2 text-[.63rem] font-bold uppercase tracking-[.24em] text-[#647650] sm:text-xs">
              <span className="h-px w-7 bg-[#9bad7d]" />
              <Leaf size={15} className="text-[#4abd00]" aria-hidden="true" />
              Save Eco Organic
              <span className="h-px w-7 bg-[#9bad7d]" />
            </p>
            <p className="mt-3 text-[.6rem] font-semibold uppercase tracking-[.25em] text-[#80906f]">Certifications</p>
            <h1 className="mt-2 font-heading text-[clamp(2.3rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-.045em] text-[#143b20]">
              Quality and <span className="saveeco-title-accent">certification</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#647264] sm:text-base sm:leading-7">
              View the certificate records published by Save Eco Organic. Open any item to read its details and available document.
            </p>
          </header>

          {isLoading && (
            <div className="grid gap-5 md:grid-cols-2">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="h-48 animate-pulse rounded-[1.5rem] border border-[#e2ead9] bg-white" />
              ))}
            </div>
          )}

          {isError && (
            <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
              Certificates could not be loaded. Please check the database connection and try again.
            </div>
          )}

          {!isLoading && !isError && certificates.length === 0 && (
            <div className="mx-auto max-w-xl rounded-[1.5rem] border border-[#e1e9d8] bg-white px-6 py-12 text-center shadow-[0_12px_36px_rgba(30,60,34,.06)] sm:py-16">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#edf5e2] text-[#398b24]">
                <Award size={25} aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-heading text-xl font-semibold text-[#173b25]">No certificates published yet</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#667264]">
                Published certificate records will appear here automatically.
              </p>
            </div>
          )}

          {!isLoading && !isError && certificates.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {certificates.map((certificate, index) => (
                <Link
                  key={certificate.id}
                  to={`/certificates/${certificate.id}`}
                  className="group relative flex min-h-[190px] gap-4 overflow-hidden rounded-[1.5rem] border border-[#dce7cf] bg-[#fffefa] p-4 shadow-[0_10px_28px_rgba(24,58,31,.06)] transition duration-500 ease-out hover:-translate-y-1.5 hover:border-[#83bd55] hover:shadow-[0_22px_48px_rgba(24,58,31,.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4abd00] sm:gap-5 sm:p-5"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <span className="grid size-[112px] shrink-0 place-items-center self-center overflow-hidden rounded-[1.1rem] border border-[#e1e8d7] bg-[#f1f6e9] sm:size-[138px]">
                    {certificate.image_url ? (
                      <img src={certificate.image_url} alt={`${certificate.title} certificate`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    ) : (
                      <Award size={45} strokeWidth={1.3} className="text-[#398b24] transition duration-500 group-hover:-rotate-6 group-hover:scale-110" aria-hidden="true" />
                    )}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col justify-center py-1">
                    <span className="mb-2 inline-flex items-center gap-1.5 text-[.58rem] font-bold uppercase tracking-[.2em] text-[#6d8c53]">
                      {certificate.pdf_url ? <FileText size={13} aria-hidden="true" /> : <BadgeCheck size={13} aria-hidden="true" />}
                      Certification
                    </span>
                    <span className="line-clamp-2 font-heading text-xl font-semibold leading-tight text-[#143b20] transition-colors group-hover:text-[#347c21] sm:text-2xl">
                      {certificate.title}
                    </span>
                    {certificate.issuer && <span className="mt-2 line-clamp-1 text-sm text-[#647264]">{certificate.issuer}</span>}
                    {certificate.number && <span className="mt-1 line-clamp-1 text-xs text-[#7b8576]">Certificate no. {certificate.number}</span>}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#317d18]">
                      Read certificate details
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicPageLayout>
  );
}
