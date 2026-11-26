import { ArrowUpRight, Leaf, Mail, MapPin, Navigation, Sprout } from "lucide-react";
import ContactForm from "../components/forms/ContactForm";
import PublicPageLayout from "../components/layout/PublicPageLayout";
import { siteConfig } from "../lib/siteConfig";
import contactHero from "../assets/contact-seedling-bg.png";

export default function Contact() {
  const mapQuery = encodeURIComponent(siteConfig.address);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <PublicPageLayout>
      <main className="overflow-hidden bg-[#fbfaf5] font-body">
        <section
          className="contact-page-hero relative isolate flex min-h-[190px] items-center overflow-hidden bg-cover bg-[center_48%] px-5 py-9 sm:min-h-[220px] sm:px-8 lg:min-h-[245px] lg:px-12"
          style={{ backgroundImage: `url(${contactHero})` }}
          aria-labelledby="contact-title"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(241,248,231,.98)_0%,rgba(241,248,231,.94)_34%,rgba(241,248,231,.72)_52%,rgba(241,248,231,.12)_100%)]"
          />
          <div className="contact-page-intro relative z-10 mx-auto w-full max-w-[1320px]">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#32712e] sm:text-sm">
              <Sprout size={16} aria-hidden="true" /> Contact Save Eco
            </p>
            <h1
              id="contact-title"
              className="mt-2 text-[clamp(2.35rem,4.8vw,3.65rem)] leading-[.98] tracking-[-.045em]"
            >
              <span className="saveeco-title-main">Let’s work </span>
              <span className="saveeco-title-accent">together</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#46594a] sm:text-base">
              Have a question or want to work with us? Send a message and our team will be glad to help.
            </p>
            <span aria-hidden="true" className="mt-4 block h-[3px] w-16 rounded-full bg-[#4abd00]" />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-5 py-9 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_5%,rgba(244,241,223,.62),transparent_45%),linear-gradient(180deg,#fffefa_0%,#fbfaf5_100%)]"
          />
          <div className="mx-auto grid max-w-[1320px] items-start gap-8 lg:grid-cols-[.95fr_1.05fr] lg:gap-10">
            <div className="min-w-0">
              <div className="contact-page-reveal">
                <p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-[#66864c]">We’re easy to reach</p>
                <h2 className="mt-1 text-3xl leading-tight tracking-[-.035em] sm:text-[2.35rem]">
                  <span className="saveeco-title-main">Get in </span>
                  <span className="saveeco-title-accent">touch</span>
                </h2>
              </div>

              <a
                href={`mailto:${siteConfig.email}`}
                className="contact-page-card contact-page-reveal group mt-5 flex min-h-[68px] items-center gap-4 rounded-2xl border border-[#e1e9d6] bg-white/85 px-4 py-3 shadow-[0_8px_22px_rgba(27,56,31,.045)] transition duration-300 hover:-translate-y-1 hover:border-[#b8d69b] hover:bg-[#f6faef] hover:shadow-[0_15px_30px_rgba(27,56,31,.09)]"
                style={{ animationDelay: "80ms" }}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#eaf4df] text-[#378328] transition duration-300 group-hover:rotate-[-5deg] group-hover:bg-[#4abd00] group-hover:text-white">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[.62rem] font-bold uppercase tracking-[.16em] text-[#789064]">Email our team</span>
                  <span className="mt-0.5 block break-all text-sm font-semibold text-[#294632] sm:text-base">{siteConfig.email}</span>
                </span>
                <ArrowUpRight className="ml-auto shrink-0 text-[#72945a] transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#3c8d20]" size={18} aria-hidden="true" />
              </a>

              <div className="contact-page-map contact-page-reveal relative mt-5 overflow-hidden rounded-[1.45rem] border-[5px] border-white bg-[#eaf0e5] shadow-[0_16px_38px_rgba(27,56,31,.12)]" style={{ animationDelay: "150ms" }}>
                <iframe
                  title="Save Eco Organic location map"
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  className="h-[235px] w-full border-0 sm:h-[275px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-page-button absolute left-3 top-3 inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#e1e8d8] bg-white/95 px-3.5 text-xs font-bold text-[#285d30] shadow-[0_5px_16px_rgba(19,46,26,.12)] transition duration-300 hover:-translate-y-0.5 hover:border-[#a6ce7a] hover:bg-[#f5faee] hover:shadow-lg"
                >
                  Open in Maps <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>

              <article className="contact-page-card contact-page-reveal group relative mt-4 overflow-hidden rounded-[1.4rem] border border-[#dfe9d3] bg-gradient-to-br from-white via-[#fbfcf6] to-[#edf5e4] p-4 shadow-[0_10px_28px_rgba(27,56,31,.065)] transition duration-300 hover:-translate-y-1 hover:border-[#b9d59c] hover:shadow-[0_17px_34px_rgba(27,56,31,.11)] sm:p-5" style={{ animationDelay: "220ms" }}>
                <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-14 size-36 rounded-full border border-[#d7e8c7] transition-transform duration-700 group-hover:scale-125" />
                <div className="relative flex items-start gap-3.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#e3f1d5] text-[#388629] transition duration-300 group-hover:rotate-[-5deg] group-hover:bg-[#4abd00] group-hover:text-white">
                    <MapPin size={21} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[.62rem] font-bold uppercase tracking-[.17em] text-[#6d9252]">Visit our office</p>
                    <h3 className="mt-1 font-heading text-lg font-semibold leading-tight text-[#173b25] sm:text-xl">Save Eco Organic</h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-6 text-[#586657]">{siteConfig.address}</p>
                  </div>
                </div>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-page-button relative mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#174b2b] px-4 py-2 text-xs font-bold text-white shadow-[0_7px_18px_rgba(23,75,43,.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#236638] hover:shadow-[0_11px_22px_rgba(23,75,43,.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#4abd00]"
                >
                  <Navigation size={15} aria-hidden="true" /> Get directions
                  <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={14} aria-hidden="true" />
                </a>
                <span aria-hidden="true" className="absolute bottom-4 right-5 text-[#80a95c]/35"><Leaf size={25} /></span>
              </article>
            </div>

            <div className="contact-page-form contact-page-reveal relative rounded-[1.4rem] border border-[#e5e9dd] bg-[#fffefa] p-4 shadow-[0_14px_38px_rgba(28,57,32,.08)] sm:rounded-[1.6rem] sm:p-5 lg:p-6">
  <style>{`
    .contact-page-form form {
      display: grid;
      gap: 12px;
    }

    .contact-page-form form > * {
      margin: 0 !important;
    }

    .contact-page-form label {
      display: block;
      margin-bottom: 5px;
      color: #405744;
      font-size: 13px;
      font-weight: 600;
    }

    .contact-page-form input:not([type="checkbox"]),
    .contact-page-form select {
      width: 100%;
      height: 44px;
      min-height: 44px !important;
      padding: 9px 13px !important;
      border: 1px solid #dce5d6;
      border-radius: 11px;
      background: #fff;
      color: #263d2d;
      font-size: 14px;
      transition: border-color .2s, box-shadow .2s;
    }

    .contact-page-form textarea {
      width: 100%;
      height: 100px !important;
      min-height: 100px !important;
      padding: 11px 13px !important;
      border: 1px solid #dce5d6;
      border-radius: 11px;
      background: #fff;
      color: #263d2d;
      font-size: 14px;
      resize: vertical;
      transition: border-color .2s, box-shadow .2s;
    }

    .contact-page-form input:focus,
    .contact-page-form select:focus,
    .contact-page-form textarea:focus {
      border-color: #75b947;
      outline: none;
      box-shadow: 0 0 0 3px rgba(74, 189, 0, .12);
    }

    .contact-page-form input[type="checkbox"] {
      width: 16px;
      height: 16px;
      accent-color: #4abd00;
    }

    .contact-page-form button[type="submit"] {
      min-height: 44px;
      width: fit-content;
      padding: 10px 20px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
    }
  `}</style>

  <span
    aria-hidden="true"
    className="absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-[#c3eb57] via-[#4abd00] to-[#c3eb57]"
  />

  <p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#6d9252]">
    We’d love to hear from you
  </p>

  <h2 className="mt-1 text-2xl leading-tight tracking-[-.035em] sm:text-[2rem]">
    <span className="saveeco-title-main">Send a </span>
    <span className="saveeco-title-accent">message</span>
  </h2>

  <span
    aria-hidden="true"
    className="mt-2 block h-[2px] w-10 rounded-full bg-[#77b738]"
  />

  <p className="mb-4 mt-2 text-sm leading-5 text-[#6a7567]">
    Fill in the form and our team will respond to your enquiry.
  </p>

  <ContactForm />
</div>
          </div>
        </section>
      </main>
    </PublicPageLayout>
  );
}
