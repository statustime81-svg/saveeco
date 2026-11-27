import { ArrowRight, Award, BadgeCheck, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useCertificates } from "../../hooks/useCertificates";

export default function Certificates() {
  const { data: certificates = [], isLoading, isError } = useCertificates();
  const featuredCertificates = certificates.slice(0, 3);

  return (
    <section
      id="certifications"
      className="relative isolate overflow-hidden bg-[#f8fbf2] px-5 py-14 sm:px-8 sm:py-16 lg:py-[4.5rem]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 -z-10 size-[26rem] rounded-full bg-[#4abd00]/[.055] blur-3xl"
      />
      <div className="mx-auto max-w-[1240px]">
        <header className="mx-auto mb-9 max-w-2xl text-center sm:mb-11">
          <p className="inline-flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-[.24em] text-[#647650] sm:text-xs">
            <span className="h-px w-7 bg-[#9bad7d]" />
            <Award size={15} className="text-[#4abd00]" aria-hidden="true" />
            Certifications
            <span className="h-px w-7 bg-[#9bad7d]" />
          </p>
          <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-.04em] text-[#143b20]">
            Quality and <span className="saveeco-title-accent">certification</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#647264] sm:text-base">
            Explore the certifications and documents published by Save Eco Organic.
          </p>
        </header>

        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-44 animate-pulse rounded-[1.4rem] border border-[#e2ead9] bg-white" />
            ))}
          </div>
        )}

        {isError && (
          <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            Certificates could not be loaded. Please check the connection and try again.
          </p>
        )}

        {!isLoading && !isError && featuredCertificates.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCertificates.map((certificate, index) => (
              <Link
                key={certificate.id}
                to={`/certificates/${certificate.id}`}
                className="group relative flex min-h-[172px] items-center gap-4 overflow-hidden rounded-[1.4rem] border border-[#dce7cf] bg-[#fffefa] p-4 shadow-[0_8px_26px_rgba(24,58,31,.055)] transition duration-500 ease-out hover:-translate-y-1.5 hover:border-[#83bd55] hover:shadow-[0_20px_44px_rgba(24,58,31,.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4abd00] sm:gap-5 sm:p-5"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="grid size-[92px] shrink-0 place-items-center overflow-hidden rounded-[1rem] border border-[#e1e8d7] bg-[#f3f7ec] transition duration-500 group-hover:scale-[1.03] sm:size-[108px]">
                  {certificate.image_url ? (
                    <img
                      src={certificate.image_url}
                      alt={`${certificate.title} certificate`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <Award size={38} strokeWidth={1.35} className="text-[#398b24] transition duration-500 group-hover:-rotate-6 group-hover:scale-110" aria-hidden="true" />
                  )}
                </span>

                <span className="min-w-0 flex-1 py-1">
                  <span className="mb-2 block text-[.58rem] font-bold uppercase tracking-[.2em] text-[#557a3a]">Certificate</span>
                  <span className="block line-clamp-2 font-heading text-xl font-semibold leading-tight text-[#143b20] transition-colors group-hover:text-[#347c21] sm:text-[1.35rem]">
                    {certificate.title}
                  </span>
                  {(certificate.issuer || certificate.number) && (
                    <span className="mt-1.5 block line-clamp-1 text-xs text-[#6b7568]">
                      {[certificate.issuer, certificate.number].filter(Boolean).join(" · ")}
                    </span>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#317d18]">
                    {certificate.pdf_url ? <FileText size={14} aria-hidden="true" /> : <BadgeCheck size={14} aria-hidden="true" />}
                    View certificate
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && !isError && certificates.length === 0 && (
          <div className="mx-auto max-w-xl rounded-[1.4rem] border border-[#e1e9d8] bg-white px-6 py-8 text-center">
            <Award size={28} className="mx-auto text-[#4a8c20]" aria-hidden="true" />
            <p className="mt-3 font-heading text-lg font-semibold text-[#143b20]">Certificates will appear here</p>
            <p className="mt-1 text-sm leading-6 text-[#697466]">Published certificates from the admin panel will be shown on this page.</p>
          </div>
        )}

        <div className="mt-7 flex justify-center">
          <Link
            to="/certificates"
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#17632d] px-6 py-3 text-sm font-semibold !text-white shadow-[0_10px_24px_rgba(23,99,45,.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#124e25] hover:shadow-[0_14px_28px_rgba(23,99,45,.23)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4abd00]"
          >
            View All Certificates
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
