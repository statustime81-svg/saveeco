import { ArrowRight, Mail, Phone } from "lucide-react";
import Button from "../ui/Button";
import { siteConfig } from "../../lib/siteConfig";

export default function ContactStrip() {
  return (
    <section className="bg-primary-dark px-5 py-12 text-white sm:px-8">
      <div className="mx-auto flex max-w-site flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-100">
            Have a question?
          </p>
          <h2 className="mt-2 font-heading text-2xl font-semibold">
            Get in touch with Save Eco
          </h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-green-50">
            <a
              className="inline-flex items-center gap-2"
              href={`tel:${siteConfig.phonePrimary}`}
            >
              <Phone size={16} aria-hidden="true" />
              {siteConfig.phonePrimary}
            </a>
            <a
              className="inline-flex items-center gap-2"
              href={`mailto:${siteConfig.email}`}
            >
              <Mail size={16} aria-hidden="true" />
              {siteConfig.email}
            </a>
          </div>
        </div>

        <Button href="#contact" className="bg-white text-primary-dark hover:bg-green-50">
          Send a message <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}