import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * `inverse` / `ghostInverse` are for the dark panels (flagship card, final
 * CTA). They exist as real variants rather than className overrides because
 * Tailwind resolves conflicting utilities by stylesheet order, not by the
 * order classes appear in the attribute.
 */
type Variant = "primary" | "secondary" | "ghost" | "inverse" | "ghostInverse";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-sm hover:bg-accent-hover hover:shadow-md active:translate-y-px",
  secondary:
    "bg-surface text-ink border border-line-strong hover:border-ink-muted hover:bg-elevated active:translate-y-px",
  ghost: "text-ink-soft hover:text-ink hover:bg-elevated",
  inverse:
    "bg-white text-[#0d1113] shadow-sm hover:bg-white/90 hover:shadow-md active:translate-y-px",
  ghostInverse: "text-white/70 hover:bg-white/10 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-[0.9375rem] gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

/**
 * Every CTA on this site navigates, so the button is an anchor by design —
 * keeps semantics and keyboard behaviour correct without extra ARIA.
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  const external = href?.startsWith("http");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        "transition-all duration-200 ease-out select-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
