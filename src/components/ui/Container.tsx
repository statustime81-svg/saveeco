import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function Container({ children, className, ...props }: Props) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
