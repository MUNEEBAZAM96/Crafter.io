import { social } from "@/lib/data";
import { cn } from "@/lib/cn";

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 26" aria-hidden className={cn("shrink-0", className)}>
      <path d="M1.6.6 14.2 13 1.6 25.4A2 2 0 0 1 1 24V2A2 2 0 0 1 1.6.6Z" fill="#34d399" />
      <path d="m17.5 9.7 3.9 2.2a1.3 1.3 0 0 1 0 2.2l-3.9 2.2L14 13Z" fill="#fbbf24" />
      <path d="M1.6.6 14.2 13l3.3-3.3L3.6.2A1.9 1.9 0 0 0 1.6.6Z" fill="#60a5fa" />
      <path d="m14.2 13 3.3 3.3L3.6 25.8a1.9 1.9 0 0 1-2-.4Z" fill="#f87171" />
    </svg>
  );
}

type GooglePlayButtonProps = {
  /** A specific listing URL. Falls back to the studio's developer page. */
  url?: string | null;
  label?: string;
  variant?: "compact" | "full";
  /** `onDark` restyles the button for the dark flagship/CTA panels. */
  tone?: "default" | "onDark";
  className?: string;
};

/**
 * Renders nothing when neither a listing URL nor the studio developer page is
 * configured — an unpublished app shows no Play Store CTA rather than a link
 * to a page that doesn't exist. Set VITE_PLAY_STORE_URL or the app's
 * `playStoreUrl` to switch it on.
 */
export function GooglePlayButton({
  url,
  label = "Google Play",
  variant = "compact",
  tone = "default",
  className,
}: GooglePlayButtonProps) {
  const href = url ?? social.playStore;
  if (!href) return null;

  if (variant === "full") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group inline-flex items-center gap-3 rounded-2xl border border-line-strong bg-surface px-5 py-3",
          "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-ink-muted hover:shadow-md",
          className,
        )}
      >
        <PlayGlyph className="size-7" />
        <span className="flex flex-col text-left leading-tight">
          <span className="text-[0.6875rem] uppercase tracking-wide text-ink-muted">
            Get it on
          </span>
          <span className="text-[0.9375rem] font-semibold text-ink">
            Google Play
          </span>
        </span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border px-3.5",
        "text-sm font-medium transition-colors duration-200",
        tone === "onDark"
          ? "border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:text-white"
          : "border-line-strong bg-surface text-ink-soft hover:border-ink-muted hover:text-ink",
        className,
      )}
    >
      <PlayGlyph className="size-4" />
      {label}
    </a>
  );
}
