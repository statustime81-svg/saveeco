import { useEffect, useRef, useState } from "react";
import { Leaf, Mail, Phone, Sprout } from "lucide-react";
import { siteConfig } from "../../lib/siteConfig";
import contactBackground from "../../assets/contact-cta-bg.png";
import ContactForm from "../forms/ContactForm";
import "./ContactSection.css";

const headingFont = "var(--font-heading, 'Playfair Display', Georgia, serif)";
const accentFont = "'Cormorant Garamond', Georgia, serif";
const bodyFont = "var(--font-body, 'Manrope', Arial, sans-serif)";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home-contact"
      aria-labelledby="home-contact-title"
      className={`contact-section relative isolate overflow-hidden bg-[#f8f7ef] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 ${isVisible ? "is-visible" : ""}`}
      style={{
        fontFamily: bodyFont,
        backgroundImage: `url(${contactBackground})`,
        backgroundPosition: "right center",
        backgroundSize: "auto 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-r from-[#f8f7ef] via-[#f8f7ef]/95 to-[#f8f7ef]/55"
      />

      <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-7 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
        <div className="contact-section__intro max-w-[620px]">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#dce8cf] bg-white/80 px-3.5 py-2 text-[.65rem] font-bold uppercase tracking-[.18em] text-[#356d2d] shadow-sm backdrop-blur-sm sm:text-xs">
            <Sprout size={15} className="text-[#4abd00]" aria-hidden="true" />
            Let’s connect
          </p>

          <h2
            id="home-contact-title"
            style={{ fontFamily: headingFont }}
            className="mt-5 text-[2.55rem] font-semibold leading-[1.03] tracking-[-.04em] text-[#143b20] sm:text-5xl lg:text-[3.8rem]"
          >
            Good things grow from a{" "}
            <span
              style={{
                fontFamily: accentFont,
                fontStyle: "italic",
                fontWeight: 600,
                color: "#4a8c20",
                letterSpacing: "-.045em",
              }}
            >
              conversation.
            </span>
          </h2>

          <p className="mt-4 max-w-[520px] text-sm leading-6 text-[#596858] sm:text-base sm:leading-7">
            Questions about our products or partnership? Talk to our team and
            we’ll help you find the right way forward.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={`tel:${siteConfig.phonePrimary}`}
              className="contact-section__info group flex min-w-0 items-center gap-3 rounded-2xl border border-[#e1e8d6] bg-white/85 p-3.5 shadow-[0_8px_24px_rgba(23,59,37,.05)]"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#edf5e4] text-[#347d25] transition-colors duration-300 group-hover:bg-[#4abd00] group-hover:text-white">
                <Phone size={19} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[.62rem] font-bold uppercase tracking-[.13em] text-[#7a896c]">
                  Call us
                </span>
                <span className="mt-1 block truncate text-sm font-semibold text-[#173b25]">
                  {siteConfig.phonePrimary}
                </span>
              </span>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="contact-section__info group flex min-w-0 items-center gap-3 rounded-2xl border border-[#e1e8d6] bg-white/85 p-3.5 shadow-[0_8px_24px_rgba(23,59,37,.05)]"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#edf5e4] text-[#347d25] transition-colors duration-300 group-hover:bg-[#4abd00] group-hover:text-white">
                <Mail size={19} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[.62rem] font-bold uppercase tracking-[.13em] text-[#7a896c]">
                  Email us
                </span>
                <span className="mt-1 block truncate text-sm font-semibold text-[#173b25]">
                  {siteConfig.email}
                </span>
              </span>
            </a>
          </div>
        </div>

        <div className="contact-section__panel relative overflow-hidden rounded-[1.6rem] border border-[#dfe7d5] bg-[#fffef9]/95 p-3.5 shadow-[0_18px_46px_rgba(25,60,32,.11)] backdrop-blur-md sm:p-5 lg:p-5">
          <div
            aria-hidden="true"
            className="contact-section__glow pointer-events-none absolute -right-16 -top-20 z-0 size-64 rounded-full bg-[#d9edc2]/45 blur-2xl"
          />

          <div className="relative z-10 mb-3.5 overflow-hidden rounded-xl bg-gradient-to-br from-[#174a27] to-[#236638] p-4 text-white sm:p-4">
            <div
              aria-hidden="true"
              className="contact-section__leaf absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/15 bg-white/10 text-[#c4e69f]"
            >
              <Leaf size={18} strokeWidth={1.5} />
            </div>
            <p className="text-[.58rem] font-bold uppercase tracking-[.2em] text-[#c6e4a7]">
              We’d love to hear from you
            </p>
            <h3
              style={{ fontFamily: headingFont }}
              className="mt-1.5 max-w-[340px] text-xl font-semibold leading-tight sm:text-2xl"
            >
              Send us a message
            </h3>
            <p className="mt-1.5 max-w-[390px] text-[.72rem] leading-5 text-[#e1eadc] sm:text-xs">
              Fill in the form and our team can respond to your enquiry.
            </p>
            <span
              className="absolute -bottom-7 right-24 size-20 rounded-full border border-white/10"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 px-0.5 pb-0.5 sm:px-1">
            <ContactForm variant="home" />
          </div>
        </div>
      </div>
    </section>
  );
}