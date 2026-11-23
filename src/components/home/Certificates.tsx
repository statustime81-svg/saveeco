import { useState } from "react";
import {
  ArrowRight,
  Award,
  ExternalLink,
  Leaf,
  X,
} from "lucide-react";
import { useCertificates, type Certificate } from "../../hooks/useCertificates";

function CertificateCard({
  certificate,
}: {
  certificate: Certificate;
}) {
  return (
    <article className="grid min-h-[310px] overflow-hidden rounded-[1.5rem] border border-[#cbd7b7] bg-[#fbfaf3] p-3 shadow-[0_12px_32px_rgba(20,59,32,.07)] sm:p-4 lg:grid-cols-[.82fr_1.18fr]">
      <div className="relative grid min-h-[230px] place-items-center overflow-hidden rounded-[1.1rem] border border-[#d8dfca] bg-gradient-to-br from-[#f0f2e5] via-[#fbfaf3] to-[#e8eddd] p-5">
        {certificate.image_url ? (
          <img
            src={certificate.image_url}
            alt={`${certificate.title} certificate`}
            className="h-full max-h-[280px] w-full rounded-lg object-contain"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center rounded-lg border border-[#bdc9a8] bg-[#fffef9] p-5 text-center">
            <span className="grid size-16 place-items-center rounded-full border border-[#4abd00] text-[#28721e]">
              <Award size={34} strokeWidth={1.4} aria-hidden="true" />
            </span>
            <span className="mt-4 text-[.6rem] font-bold uppercase tracking-[.22em] text-[#61754f]">
              Certificate
            </span>
            <span className="mt-2 font-heading text-xl font-semibold text-[#143b20]">
              {certificate.title}
            </span>
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-md bg-[#4abd00] px-3 py-1 font-heading text-lg font-bold text-[#143b20]">
          {String(certificate.sort_order + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-col justify-center px-4 py-5 sm:px-6 lg:py-6">
        <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#71845d]">
          Certification
        </p>

        <h3 className="mt-2 font-heading text-2xl font-semibold leading-tight text-[#143b20] sm:text-3xl">
          {certificate.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#455747]">
          {certificate.issuer || "Save Eco Organic certification"}
        </p>

        <div className="my-4 h-px w-full bg-[#4abd00]/70" />

        {certificate.number && (
          <p className="text-xs leading-5 text-[#455747] sm:text-sm">
            <span className="font-semibold text-[#143b20]">
              Certificate No.:
            </span>{" "}
            {certificate.number}
          </p>
        )}

        {certificate.pdf_url ? (
          <a
            href={certificate.pdf_url}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#4a8c20] underline decoration-[#4abd00] decoration-2 underline-offset-4 transition hover:gap-3"
          >
            View certificate
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        ) : certificate.image_url ? (
          <a
            href={certificate.image_url}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#4a8c20] underline decoration-[#4abd00] decoration-2 underline-offset-4 transition hover:gap-3"
          >
            View certificate
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        ) : (
          <span className="mt-5 text-xs text-[#71806b]">
            Certificate document will be available soon.
          </span>
        )}
      </div>
    </article>
  );
}

export default function Certificates() {
  const { data: certificates = [], isLoading, isError } = useCertificates();
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const visibleCertificates = certificates.slice(0, 2);

  return (
    <section
      id="certifications"
      className="relative isolate overflow-hidden bg-[#f8fbf2] px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <Leaf
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 -top-8 -z-10 size-40 -rotate-45 text-[#78915c]/20 sm:size-52"
        strokeWidth={0.8}
      />
      <Leaf
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-8 -z-10 size-40 rotate-45 text-[#78915c]/20 sm:size-52"
        strokeWidth={0.8}
      />

      <div className="mx-auto max-w-[1320px]">
        <header className="mb-8 text-center sm:mb-10">
          <div className="mb-5 flex items-center justify-center gap-3">
            <Leaf
              size={30}
              className="text-[#4abd00]"
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <span className="font-heading text-xl font-semibold text-[#143b20] sm:text-2xl">
              Save Eco Organic
            </span>
          </div>

          <p className="text-[.65rem] font-bold uppercase tracking-[.22em] text-[#71845d]">
            Certifications
          </p>

          <h2 className="mt-3 font-heading text-[clamp(2.3rem,4.5vw,4rem)] font-semibold leading-[1.04] tracking-[-.035em] text-[#143b20]">
            Quality and certification
          </h2>

          <span className="mx-auto mt-5 block h-[3px] w-24 rounded-full bg-[#4abd00]" />

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-[#455747] sm:text-base sm:leading-7">
            View Save Eco Organic certification information and documents.
          </p>
        </header>

        {isLoading && (
          <div className="grid gap-5 lg:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-[310px] animate-pulse rounded-[1.5rem] border border-[#dce5d0] bg-white/70"
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            Certificates load nahi ho paaye. Supabase connection aur
            certificates table permissions check karo.
          </p>
        )}

        {!isLoading && !isError && certificates.length === 0 && (
          <div className="rounded-2xl border border-[#dce5d0] bg-white/70 px-6 py-10 text-center">
            <Award
              size={34}
              className="mx-auto text-[#4a8c20]"
              aria-hidden="true"
            />
            <p className="mt-3 font-heading text-xl font-semibold text-[#143b20]">
              No active certificates yet
            </p>
            <p className="mt-2 text-sm text-[#647650]">
              Admin panel se certificate add karke “Visible on website” enable
              karo.
            </p>
          </div>
        )}

        {!isLoading && !isError && certificates.length > 0 && (
          <>
            <div className="grid items-start gap-5 lg:grid-cols-2">
              {visibleCertificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                />
              ))}
            </div>

            <div className="mt-9 text-center">
              <button
                type="button"
                onClick={() => setShowAllCertificates(true)}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#4abd00] bg-[#143b20] px-7 py-3 font-heading text-lg font-semibold text-[#fbfaf3] shadow-[0_10px_24px_rgba(20,59,32,.16)] transition hover:-translate-y-0.5 hover:bg-[#1d502b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4abd00]"
              >
                View All Certificates
                <ArrowRight size={19} aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </div>

      {showAllCertificates && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#10251a]/75 p-4 backdrop-blur-sm sm:p-8"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowAllCertificates(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="all-certificates-title"
            className="max-h-[90vh] w-full max-w-[1100px] overflow-y-auto rounded-[1.5rem] border border-[#dce5d0] bg-[#f8fbf2] p-5 shadow-2xl sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-[#71845d]">
                  Save Eco Organic
                </p>
                <h2
                  id="all-certificates-title"
                  className="mt-2 font-heading text-3xl font-semibold text-[#143b20] sm:text-4xl"
                >
                  All Certificates
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowAllCertificates(false)}
                aria-label="Close all certificates"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-[#cad7b8] bg-white text-[#143b20] transition hover:bg-[#eaf3df]"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {certificates.map((certificate) => (
                <article
                  key={certificate.id}
                  className="overflow-hidden rounded-2xl border border-[#d5dfc7] bg-white p-4"
                >
                  {certificate.image_url ? (
                    <a
                      href={certificate.image_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block overflow-hidden rounded-xl bg-[#f3f4e9]"
                    >
                      <img
                        src={certificate.image_url}
                        alt={`${certificate.title} certificate`}
                        className="h-[300px] w-full object-contain"
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <div className="grid h-[220px] place-items-center rounded-xl bg-[#f0f3e7]">
                      <Award
                        size={48}
                        className="text-[#4a8c20]"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <h3 className="mt-4 font-heading text-2xl font-semibold text-[#143b20]">
                    {certificate.title}
                  </h3>

                  {certificate.issuer && (
                    <p className="mt-2 text-sm leading-6 text-[#536153]">
                      {certificate.issuer}
                    </p>
                  )}

                  {certificate.number && (
                    <p className="mt-2 text-xs text-[#647650]">
                      Certificate No.: {certificate.number}
                    </p>
                  )}

                  {certificate.pdf_url && (
                    <a
                      href={certificate.pdf_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#eaf3df] px-4 py-2 text-sm font-semibold text-[#245f1d] transition hover:bg-[#dcecc9]"
                    >
                      Open full certificate
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}