import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">
      <span aria-hidden className="h-px w-6 bg-accent-ink/40" />
      {children}
    </span>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Consistent horizontal rhythm across every section. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
