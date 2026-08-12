import { Check, Droplet, Mic, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/cn";

/** Animated listening waveform used in the Awaz Khata mockups. */
function Waveform({ className, bars = 22 }: { className?: string; bars?: number }) {
  return (
    <div className={cn("flex h-8 items-center justify-center gap-[3px]", className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-current animate-wave"
          style={{
            height: `${28 + Math.sin(i * 1.7) * 22 + (i % 3) * 8}%`,
            animationDelay: `${(i % 7) * 110}ms`,
            opacity: 0.55 + (i % 4) * 0.15,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function AwazKhataScreen() {
  const entries = [
    { label: "چائے", roman: "Chai", amount: "-250", kind: "out" as const },
    { label: "دکان سیل", roman: "Shop sale", amount: "+4,800", kind: "in" as const },
    { label: "اسلم — ادھار", roman: "Aslam — udhaar", amount: "-1,200", kind: "due" as const },
  ];

  return (
    <div className="flex h-full flex-col px-4 pb-2 pt-2">
      <div className="flex items-baseline justify-between">
        <p className="text-[0.7rem] font-medium text-white/50">This month</p>
        <p dir="rtl" lang="ur" className="text-[0.7rem] text-white/50">
          آواز کھاتا
        </p>
      </div>

      <p className="mt-0.5 text-[1.6rem] font-semibold tracking-tight">
        Rs 32,450
      </p>
      <div className="mt-1 flex gap-3 text-[0.6rem]">
        <span className="flex items-center gap-1 text-emerald-400">
          <TrendingUp className="size-3" /> 48,900 in
        </span>
        <span className="flex items-center gap-1 text-rose-400">
          <TrendingDown className="size-3" /> 16,450 out
        </span>
      </div>

      {/* Live capture card */}
      <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
        <div className="flex items-center gap-2 text-[0.6rem] text-emerald-300">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full rounded-full bg-emerald-400 animate-pulse-ring" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          Listening…
        </div>

        <Waveform className="mt-2 text-emerald-300/80" />

        <p dir="rtl" lang="ur" className="mt-2 text-center text-[0.78rem] leading-relaxed">
          چائے کے ڈھائی سو روپے دیے
        </p>

        <div className="mt-2.5 flex flex-wrap justify-center gap-1">
          {["Expense", "Rs 250", "Food"].map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[0.58rem] font-medium text-emerald-200"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-3 text-[0.6rem] font-medium uppercase tracking-wide text-white/40">
        Recent
      </p>
      <ul className="mt-1.5 space-y-1.5">
        {entries.map((e) => (
          <li
            key={e.roman}
            className="flex items-center justify-between rounded-xl bg-white/[0.04] px-2.5 py-2"
          >
            <span className="min-w-0">
              <span dir="rtl" lang="ur" className="block text-[0.72rem] leading-tight">
                {e.label}
              </span>
              <span className="block truncate text-[0.55rem] text-white/40">
                {e.roman}
              </span>
            </span>
            <span
              className={cn(
                "text-[0.72rem] font-semibold tabular-nums",
                e.kind === "in" && "text-emerald-400",
                e.kind === "out" && "text-white/80",
                e.kind === "due" && "text-amber-400",
              )}
            >
              {e.amount}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex justify-center pb-1">
        <span className="relative grid size-12 place-items-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
          <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-pulse-ring" />
          <Mic className="relative size-5" />
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function ReviveScreen() {
  const habits = [
    { name: "Morning check-in", done: true },
    { name: "Walk 20 minutes", done: true },
    { name: "Journal", done: false },
    { name: "Sleep by 11pm", done: false },
  ];

  return (
    <div className="flex h-full flex-col bg-[#f7faf9] px-4 pb-2 pt-2 text-[#14171a]">
      <p className="text-[0.7rem] font-medium text-black/45">Day 34</p>
      <p className="text-[1.35rem] font-semibold leading-tight tracking-tight">
        Keep going.
      </p>

      <div className="mt-3 grid place-items-center">
        <div
          className="grid size-24 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#0d6759 0deg 234deg, #dbe7e3 234deg 360deg)`,
          }}
        >
          <div className="grid size-[4.75rem] place-items-center rounded-full bg-white">
            <span className="text-lg font-semibold">65%</span>
            <span className="text-[0.5rem] text-black/45">today</span>
          </div>
        </div>
      </div>

      <ul className="mt-3.5 space-y-1.5">
        {habits.map((h) => (
          <li
            key={h.name}
            className="flex items-center gap-2 rounded-xl border border-black/[0.06] bg-white px-2.5 py-2"
          >
            <span
              className={cn(
                "grid size-4 shrink-0 place-items-center rounded-full",
                h.done ? "bg-[#0d6759] text-white" : "border border-black/15",
              )}
            >
              {h.done ? <Check className="size-2.5" strokeWidth={3} /> : null}
            </span>
            <span
              className={cn(
                "text-[0.72rem]",
                h.done ? "text-black/35 line-through" : "text-black/75",
              )}
            >
              {h.name}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex justify-center pb-1">
        <span className="grid size-11 place-items-center rounded-full bg-[#0d6759] text-white shadow-lg shadow-[#0d6759]/25">
          <Plus className="size-5" />
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function HydroScreen() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#f2f8fd] px-4 pb-2 pt-2 text-[#14171a]">
      {/* Water fill */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#1c5f9e]/85 to-[#56b8f0]/45" />

      <p className="relative text-[0.7rem] font-medium text-black/45">Today</p>
      <p className="relative text-[1.35rem] font-semibold leading-tight tracking-tight">
        1.4 <span className="text-sm font-normal text-black/45">/ 3.0 L</span>
      </p>

      <div className="relative mt-4 grid grid-cols-4 gap-1.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "grid aspect-square place-items-center rounded-xl border",
              i < 4
                ? "border-transparent bg-[#1c5f9e] text-white"
                : "border-black/[0.08] bg-white text-black/20",
            )}
          >
            <Droplet className="size-3.5" strokeWidth={2.2} />
          </span>
        ))}
      </div>

      <div className="relative mt-4 rounded-2xl border border-black/[0.06] bg-white/90 p-2.5 backdrop-blur">
        <p className="text-[0.58rem] font-medium uppercase tracking-wide text-black/40">
          Next reminder
        </p>
        <p className="mt-0.5 text-[0.8rem] font-semibold">In 45 minutes</p>
      </div>

      <div className="relative mt-auto flex justify-center pb-1">
        <span className="grid size-11 place-items-center rounded-full bg-white text-[#1c5f9e] shadow-lg">
          <Plus className="size-5" />
        </span>
      </div>
    </div>
  );
}

export const screens = {
  "awaz-khata": AwazKhataScreen,
  revive: ReviveScreen,
  hydro: HydroScreen,
} as const;
