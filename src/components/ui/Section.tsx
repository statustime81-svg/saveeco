import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  background?: "white" | "cream" | "green";
  className?: string;
};

const backgrounds = {
  white: "bg-white",
  cream: "bg-cream",
  green: "bg-primary-light",
};

export default function Section({
  children,
  id,
  eyebrow,
  title,
  subtitle,
  background = "white",
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24 ${backgrounds[background]} ${className}`}
    >
      <div className="mx-auto max-w-site">
        {(eyebrow || title || subtitle) && (
          <header className="mb-8 max-w-3xl">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 font-heading text-3xl font-semibold text-ink sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 leading-7 text-muted">{subtitle}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}