import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Pure-CSS device frame. Keeps mockups dependency-free and crisp at any DPI,
 * with no screenshot assets to maintain.
 */
/** Which status-bar / home-indicator colour keeps contrast on the screen. */
export type PhoneTone = "dark" | "light";

export function Phone({
  children,
  className,
  statusBarTime = "9:41",
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  statusBarTime?: string;
  tone?: PhoneTone;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative aspect-[9/19] w-full max-w-[16rem] rounded-[2.5rem] p-[0.4rem]",
        "bg-gradient-to-b from-[#3a3f42] to-[#15181a]",
        "shadow-[0_28px_60px_-18px_rgb(0_0_0/0.45),0_0_0_1px_rgb(0_0_0/0.12)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex h-full w-full flex-col overflow-hidden rounded-[2.15rem]",
          tone === "dark" ? "bg-[#0c0f11] text-white" : "bg-white text-[#14171a]",
        )}
      >
        {/* Dynamic-island style cutout */}
        <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-[1.15rem] w-[4.5rem] -translate-x-1/2 rounded-full bg-black" />

        <div
          className={cn(
            "flex items-center justify-between px-5 pb-1 pt-2.5 text-[0.6rem] font-semibold",
            tone === "dark" ? "text-white/70" : "text-black/60",
          )}
        >
          <span>{statusBarTime}</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-3.5 rounded-[2px] border border-current opacity-70" />
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">{children}</div>

        {/* Home indicator */}
        <div
          className={cn(
            "mx-auto mb-1.5 h-1 w-24 shrink-0 rounded-full",
            tone === "dark" ? "bg-white/25" : "bg-black/20",
          )}
        />
      </div>
    </div>
  );
}
