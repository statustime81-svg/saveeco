import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "../../hooks/useContent";

const headingFont = "var(--font-heading, 'Playfair Display', Georgia, serif)";
const accentFont = "'Cormorant Garamond', Georgia, serif";
const bodyFont = "var(--font-body, 'Manrope', Arial, sans-serif)";

const fallbackFaqs = [
  {
    question: "What is Save Eco Organic Pvt Ltd?",
    answer:
      "Save Eco Organic Pvt Ltd is an ISO 9001:2015 certified company, incorporated in 2015. We work with farmers and partners to support organic techniques and responsible choices across India.",
  },
  {
    question: "Where is Save Eco Organic based?",
    answer:
      "Save Eco Organic is based in Patna, Bihar, India, with a network and presence across 21 states.",
  },
  {
    question: "Can I place an online order on this website?",
    answer:
      "You can explore our products on this website. To ask about availability, pricing or placing an order, contact us through a product enquiry form or the Contact Us page.",
  },
  {
    question: "How can I enquire about a product?",
    answer:
      "Open the product you are interested in and submit its enquiry form. You can also contact our team through the Contact Us page.",
  },
];

type AdminFAQ = {
  id: string;
  question_en: string;
  answer_en: string;
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { data: adminFaqs = [] } = useContent<AdminFAQ>("faqs");

  const publishedFaqs = adminFaqs
    .filter((faq) => faq.question_en?.trim() && faq.answer_en?.trim())
    .map((faq) => ({
      id: faq.id,
      question: faq.question_en,
      answer: faq.answer_en,
    }));

  // Show the supplied, public-facing FAQs if no active FAQs have been added
  // in the admin panel, or if the public content request is unavailable.
  const faqs = publishedFaqs.length > 0 ? publishedFaqs : fallbackFaqs;

  return (
    <section
      id="faq"
      style={{ fontFamily: bodyFont }}
      className="relative isolate overflow-hidden bg-[#f8fbf2] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 -z-10 size-64 rounded-full bg-[#4abd00]/[0.07] blur-3xl"
      />

      <div className="mx-auto grid max-w-[1280px] gap-9 lg:grid-cols-[0.72fr_1.55fr] lg:items-center lg:gap-12">
        <div className="relative z-10 max-w-[400px]">
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.18em] text-[#214b2b] sm:text-xs">
            Here to help
            <span className="h-[2px] w-12 bg-[#4abd00]" />
          </p>

          <h2
            style={{ fontFamily: headingFont }}
            className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-.04em] text-[#143b20] sm:text-5xl lg:text-[3.75rem]"
          >
            Frequently
            <br />
            asked
            <br />
            <span
              style={{
                fontFamily: accentFont,
                fontStyle: "italic",
                fontWeight: 600,
                color: "#4a8c20",
                letterSpacing: "-.045em",
              }}
            >
              questions
            </span>
          </h2>

          <p className="mt-5 max-w-[360px] text-sm leading-6 text-[#4e5b50] sm:text-base sm:leading-7">
            Find quick answers about Save Eco Organic, our products, orders and
            more.
          </p>

          <Link
            to="/contact"
            className="group mt-6 inline-flex min-h-11 items-center gap-3 rounded-full bg-[#4abd00] px-6 text-sm font-bold text-white shadow-[0_8px_20px_rgba(74,189,0,.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#3eaa00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#143b20]"
          >
            Contact Us
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <article
                key={String("id" in faq ? (faq.id ?? index) : (faq.question ?? index))}
                className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#b9d79a] bg-[#eff7e7] shadow-[0_10px_24px_rgba(31,73,36,.08)]"
                    : "border-[#dce5d2] bg-white/75 hover:border-[#a8ca81]"
                }`}
              >
                {isOpen && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 bg-[#4abd00]"
                  />
                )}

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="faq-control group/faq-button flex min-h-[64px] w-full items-center justify-between gap-4 px-4 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-l-4 hover:border-l-[#4abd00] hover:bg-[#f2f8eb] sm:min-h-[70px] sm:px-6"
                >
                  <span
                    style={{ fontFamily: headingFont }}
                    className="text-base font-semibold leading-snug text-[#143b20] sm:text-lg"
                  >
                    {faq.question}
                  </span>

                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 group-hover/faq-button:-translate-y-0.5 ${
                      isOpen
                        ? "rotate-180 border-[#4abd00] bg-[#4abd00] text-white"
                        : "border-[#4abd00] text-[#317d18] group-hover:bg-[#eaf5df]"
                    }`}
                  >
                    <ChevronDown size={18} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </button>

                <div
                  id={answerId}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mx-4 border-t border-[#cbdcba] pb-4 pt-3 sm:mx-6 sm:pb-5">
                      <p className="max-w-[760px] text-sm leading-6 text-[#405343] sm:text-[15px] sm:leading-7">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
