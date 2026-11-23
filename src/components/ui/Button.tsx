import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary",
  outline:
    "border border-primary text-primary hover:bg-primary-light focus-visible:outline-primary",
  ghost:
    "text-primary hover:bg-primary-light focus-visible:outline-primary",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes = [
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3",
    "text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2",
    variants[variant],
    className,
  ].join(" ");

  if (href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type="button">
      {children}
    </button>
  );
}