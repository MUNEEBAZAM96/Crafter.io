import { AudioLines, Droplets, Sprout, type LucideIcon } from "lucide-react";
import type { App } from "@/lib/data";
import { cn } from "@/lib/cn";

const glyphs: Record<App["slug"], LucideIcon> = {
  revive: Sprout,
  hydro: Droplets,
  "awaz-khata": AudioLines,
};

const sizes = {
  sm: { box: "size-11 rounded-[0.85rem]", icon: "size-5" },
  md: { box: "size-14 rounded-[1.05rem]", icon: "size-7" },
  lg: { box: "size-20 rounded-[1.5rem]", icon: "size-9" },
} as const;

/**
 * Generated stand-in for a real app icon. Swap this component's output for a
 * a local image once the actual PNG assets exist in /public.
 */
export function AppIcon({
  app,
  size = "md",
  className,
}: {
  app: App;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const Glyph = glyphs[app.slug];
  const s = sizes[size];

  return (
    <div
      aria-hidden
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden",
        "shadow-[0_2px_8px_-2px_rgb(0_0_0/0.18),inset_0_1px_0_rgb(255_255_255/0.22)]",
        s.box,
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(145deg, ${app.hue.from}, ${app.hue.to})`,
      }}
    >
      {/* Soft top-light to give the tile a physical, iOS-like curvature. */}
      <span className="absolute inset-x-0 top-0 h-1/2 bg-white/15" />
      <Glyph className={cn("relative text-white", s.icon)} strokeWidth={2} />
    </div>
  );
}
