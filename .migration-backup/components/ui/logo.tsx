import { cn } from "@/lib/cn";

/**
 * Wordmark + geometric mark. The mark reads as two crafted planes meeting at a
 * seam — abstract enough to work at favicon scale.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 32 32"
        aria-hidden
        className="size-8 shrink-0 rounded-[0.6rem]"
      >
        <defs>
          <linearGradient id="crafter-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3fbc9f" />
            <stop offset="100%" stopColor="#0d6759" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#crafter-mark)" />
        <path
          d="M21.5 11.2a7.2 7.2 0 1 0 0 9.6"
          fill="none"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="22.4" cy="16" r="2.1" fill="#fff" />
      </svg>

      {showWordmark ? (
        <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">
          Crafter<span className="text-accent-ink">.io</span>
        </span>
      ) : null}
    </span>
  );
}
