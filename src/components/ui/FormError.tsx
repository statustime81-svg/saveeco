import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export default function FormError({ children, className = "", ...props }: Props) {
  return (
    <p role="alert" className={["mt-1.5 text-sm text-danger", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </p>
  );
}
