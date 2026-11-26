import {
  ArrowLeft,
  Award,
  Download,
  ExternalLink,
  FileText,
  Leaf,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PublicPageLayout from "../components/layout/PublicPageLayout";
import { useCertificates } from "../hooks/useCertificates";
import SEOHead from "../lib/seo";

export default function CertificateDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: certificates = [], isLoading, isError } = useCertificates();
  const certificate = certificates.find((item) => item.id === id);

  return (
    <PublicPageLayout>
      <SEOHead
        title={certificate?.title || "Certificate details"}
        description={
          certificate
            ? `Read the published ${certificate.title} certificate information from Save Eco Organic.`
            : "Read Save Eco Organic certificate information and documents."
        }
        path={`/certificates/${id ?? ""}`}
      />

      <section className="min-h-[60vh] bg-[#f8fbf2] px-5 py-8 sm:px-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1060px]">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-xs font-medium text-[#71806c] sm:text-sm"
          >
            <Link to="/" className="transition hover:text-[#317d18]">
              Home
            </Link>
            <span className="mx-2 text-[#9bad7d]">/</span>
            <Link to="/certificates" className="transition hover:text-[#317d18]">
              Certifications
            </Link>
            {certificate && (
              <>
                <span className="mx-2 text-[#9bad7d]">/</span>
                <span aria-current="page" className="text-[#315b36]">
                  {certificate.title}
                </span>
              </>
            )}
          </nav>

          {isLoading && (
            <div className="animate-pulse rounded-[1.5rem] border border-[#e1e9d8] bg-white p-6 sm:p-8">
              <div className="h-7 w-2/3 rounded bg-[#e8eee0]" />
              <div className="mt-4 h-4 w-1/3 rounded bg-[#e8eee0]" />
              <div className="mt-7 h-[340px] rounded-2xl bg-[#e8eee0]" />
            </div>
          )}

          {isError && (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
            >
              Certificate details could not be loaded. Please check the database
              connection and try again.
            </div>
          )}

          {!isLoading && !isError && !certificate && (
            <div className="mx-auto max-w-xl rounded-[1.5rem] border border-[#e1e9d8] bg-white px-6 py-12 text-center shadow-[0_12px_36px_rgba(30,60,34,.06)] sm:py-16">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#edf5e2] text-[#398b24]">
                <Award size={25} aria-hidden="true" />
              </span>
              <h1 className="mt-4 font-heading text-2xl font-semibold text-[#173b25]">
                Certificate not found
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#667264]">
                This certificate may have been unpublished or removed.
              </p>
              <Link
                to="/certificates"
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#17632d] px-5 text-sm font-semibold text-white transition hover:bg-[#124e25]"
              >
                <ArrowLeft size={16} aria-hidden="true" /> All certificates
              </Link>
            </div>
          )}

          {!isLoading && !isError && certificate && (
            <>
              <header className="mb-6 max-w-[760px] sm:mb-8">
                <p className="inline-flex items-center gap-2 text-[.63rem] font-bold uppercase tracking-[.22em] text-[#6d8c53]">
                  <Leaf size={15} className="text-[#4abd00]" aria-hidden="true" />
                  Save Eco Organic · Certification
                </p>
                <h1 className="mt-2 font-heading text-[clamp(2.15rem,4vw,3.35rem)] font-semibold leading-[1.04] tracking-[-.04em] text-[#143b20]">
                  {certificate.title}
                </h1>
                <p className="mt-3 max-w-[720px] text-sm leading-6 text-[#647264] sm:text-[.95rem] sm:leading-7">
                  This page contains the certificate record and document
                  published by Save Eco Organic. The information shown below
                  comes from the certificate details added in the admin panel.
                </p>
              </header>

              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,.82fr)] lg:items-stretch">
                <section
                  aria-label="Certificate document"
                  className="flex min-h-[300px] flex-col overflow-hidden rounded-[1.35rem] border border-[#dfe8d5] bg-white p-3 shadow-[0_12px_32px_rgba(24,58,31,.07)] sm:min-h-[350px] sm:p-4"
                >
                  {certificate.pdf_url ? (
                    <>
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#294b2f]">
                          <FileText
                            size={17}
                            className="text-[#4a8c20]"
                            aria-hidden="true"
                          />
                          Certificate document
                        </span>
                        <span className="flex items-center gap-2">
                          <a
                            href={certificate.pdf_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#dce7cf] px-3 text-xs font-semibold text-[#315b36] transition hover:border-[#87ba61] hover:bg-[#f3f8ed]"
                          >
                            <ExternalLink size={14} aria-hidden="true" /> Open
                          </a>
                          <a
                            href={certificate.pdf_url}
                            target="_blank"
                            rel="noreferrer"
                            download
                            className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#17632d] px-3 text-xs font-semibold text-white transition hover:bg-[#124e25]"
                          >
                            <Download size={14} aria-hidden="true" /> Download
                          </a>
                        </span>
                      </div>
                      <iframe
                        src={certificate.pdf_url}
                        title={`${certificate.title} document`}
                        className="min-h-[300px] w-full flex-1 rounded-xl bg-[#eef2e8] sm:min-h-[390px]"
                      />
                    </>
                  ) : certificate.image_url ? (
                    <div className="grid flex-1 place-items-center rounded-[1.05rem] bg-[radial-gradient(ellipse_at_center,#f8faf3_0%,#edf2e7_100%)] p-4 sm:p-5">
                      <img
                        src={certificate.image_url}
                        alt={`${certificate.title} certificate`}
                        className="h-auto max-h-[300px] w-full max-w-[520px] rounded-md object-contain shadow-[0_10px_28px_rgba(25,49,27,.14)] sm:max-h-[380px]"
                      />
                    </div>
                  ) : (
                    <div className="grid flex-1 place-items-center rounded-[1.05rem] bg-[#f0f5e9] p-8 text-center">
                      <div>
                        <Award
                          size={44}
                          strokeWidth={1.3}
                          className="mx-auto text-[#43862a]"
                          aria-hidden="true"
                        />
                        <p className="mt-4 font-heading text-lg font-semibold text-[#23472a]">
                          Certificate document unavailable
                        </p>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-[#6c7767]">
                          The certificate record is published, but no image or
                          document has been added yet.
                        </p>
                      </div>
                    </div>
                  )}
                </section>

                <aside className="flex flex-col rounded-[1.35rem] border border-[#dfe8d5] bg-[#fffefa] p-5 shadow-[0_10px_28px_rgba(24,58,31,.05)] sm:p-6">
                  <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#718b5e]">
                    Certificate information
                  </p>
                  <h2 className="mt-2 font-heading text-[1.35rem] font-semibold leading-tight text-[#143b20] sm:text-2xl">
                    About this certificate
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#647264]">
                    Review the certificate details published by Save Eco
                    Organic. The document shown here is provided through the
                    admin records.
                  </p>

                  <dl className="mt-5 divide-y divide-[#e5ebde] border-y border-[#e5ebde]">
                    <div className="py-3">
                      <dt className="text-[.62rem] font-bold uppercase tracking-[.14em] text-[#7c8874]">
                        Certificate title
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-[#24472a]">
                        {certificate.title}
                      </dd>
                    </div>

                    {certificate.issuer && (
                      <div className="py-3">
                        <dt className="text-[.62rem] font-bold uppercase tracking-[.14em] text-[#7c8874]">
                          Issued by
                        </dt>
                        <dd className="mt-1 text-sm font-semibold text-[#24472a]">
                          {certificate.issuer}
                        </dd>
                      </div>
                    )}

                    {certificate.number && (
                      <div className="py-3">
                        <dt className="text-[.62rem] font-bold uppercase tracking-[.14em] text-[#7c8874]">
                          Certificate number
                        </dt>
                        <dd className="mt-1 break-all text-sm font-semibold text-[#24472a]">
                          {certificate.number}
                        </dd>
                      </div>
                    )}

                    <div className="py-3">
                      <dt className="text-[.62rem] font-bold uppercase tracking-[.14em] text-[#7c8874]">
                        Record
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-[#24472a]">
                        Published by Save Eco Organic
                      </dd>
                    </div>
                  </dl>

                  <Link
                    to="/certificates"
                    className="mt-auto inline-flex min-h-10 items-center gap-2 pt-5 text-sm font-semibold text-[#317d18] transition hover:gap-3"
                  >
                    <ArrowLeft size={16} aria-hidden="true" /> View all
                    certificates
                  </Link>
                </aside>
              </div>
            </>
          )}
        </div>
      </section>
    </PublicPageLayout>
  );
}