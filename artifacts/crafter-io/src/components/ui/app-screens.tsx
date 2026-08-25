import {
  Bell,
  Check,
  ChevronRight,
  Droplet,
  Flame,
  Heart,
  Lock,
  MessageCircle,
  Mic,
  Plus,
  Shield,
  Smartphone,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { App } from "@/lib/data";
import { cn } from "@/lib/cn";
import type { PhoneTone } from "./phone";

/**
 * Pure-CSS app mockups. These are design mockups, not screenshots of the
 * shipped apps — swap them for local image assets once real captures exist.
 *
 * Each screen declares the `tone` its phone frame should use, so the status
 * bar and home indicator stay legible against the screen's own background.
 */

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
/* Awaz Khata                                                          */
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

      <p className="mt-0.5 text-[1.6rem] font-semibold tracking-tight">Rs 32,450</p>
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
/* Revive — five screens of the core experience                        */
/* ------------------------------------------------------------------ */

const REVIVE = "#0d6759";

/** Shared shell so every Revive screen sits on the same surface. */
function ReviveShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col bg-[#f7faf9] px-4 pb-2 pt-2 text-[#14171a]">
      {children}
    </div>
  );
}

function ReviveDashboardScreen() {
  const habits = [
    { name: "Morning check-in", done: true },
    { name: "Walk 20 minutes", done: true },
    { name: "Journal", done: false },
    { name: "Sleep by 11pm", done: false },
  ];

  return (
    <ReviveShell>
      <div className="flex items-center justify-between">
        <p className="text-[0.7rem] font-medium text-black/45">Day 34</p>
        <span className="flex items-center gap-1 rounded-full bg-[#0d6759]/10 px-2 py-0.5 text-[0.55rem] font-semibold text-[#0d6759]">
          <Flame className="size-2.5" strokeWidth={2.5} /> 34-day streak
        </span>
      </div>
      <p className="text-[1.35rem] font-semibold leading-tight tracking-tight">
        Keep going.
      </p>

      <div className="mt-3 grid place-items-center">
        <div
          className="grid size-24 place-items-center rounded-full"
          style={{
            background: `conic-gradient(${REVIVE} 0deg 234deg, #dbe7e3 234deg 360deg)`,
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
    </ReviveShell>
  );
}

function ReviveJourneyScreen() {
  const milestones = [
    { label: "30 days clear", meta: "Reached", done: true },
    { label: "First full week", meta: "Reached", done: true },
    { label: "Day one", meta: "Where it started", done: true },
    { label: "60 days clear", meta: "26 days to go", done: false },
  ];

  return (
    <ReviveShell>
      <p className="text-[0.7rem] font-medium text-black/45">Your journey</p>
      <p className="text-[1.2rem] font-semibold leading-tight tracking-tight">
        34 days, one at a time
      </p>

      <div className="mt-3 rounded-2xl border border-black/[0.06] bg-white p-3">
        <div className="flex items-end gap-[3px]">
          {[40, 55, 35, 70, 62, 85, 78, 92, 60, 88, 95, 72].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h * 0.42}px`,
                backgroundColor: REVIVE,
                opacity: 0.25 + (h / 100) * 0.75,
              }}
            />
          ))}
        </div>
        <p className="mt-2 text-[0.55rem] text-black/40">Last 12 days</p>
      </div>

      <ol className="relative mt-3 space-y-2 pl-4">
        <span className="absolute left-[0.28rem] top-1.5 bottom-2 w-px bg-black/10" />
        {milestones.map((m) => (
          <li key={m.label} className="relative">
            <span
              className={cn(
                "absolute -left-4 top-1.5 size-[0.45rem] rounded-full ring-2 ring-[#f7faf9]",
                m.done ? "bg-[#0d6759]" : "bg-black/20",
              )}
            />
            <p className="text-[0.7rem] font-medium leading-tight">{m.label}</p>
            <p className="text-[0.55rem] text-black/40">{m.meta}</p>
          </li>
        ))}
      </ol>
    </ReviveShell>
  );
}

function ReviveCoachScreen() {
  return (
    <ReviveShell>
      <div className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-[#0d6759] text-white">
          <Sparkles className="size-3" />
        </span>
        <div>
          <p className="text-[0.72rem] font-semibold leading-tight">Coach</p>
          <p className="text-[0.5rem] text-black/40">Always available</p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white px-2.5 py-2 shadow-sm">
          <p className="text-[0.66rem] leading-relaxed text-black/75">
            Rough evening. The craving came back around 8.
          </p>
        </div>
        <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-[#0d6759] px-2.5 py-2">
          <p className="text-[0.66rem] leading-relaxed text-white/90">
            That took honesty to write down. Evenings have come up before —
            want to try the grounding exercise, or talk through what set it off?
          </p>
        </div>
        <div className="max-w-[70%] rounded-2xl rounded-tl-md bg-white px-2.5 py-2 shadow-sm">
          <p className="text-[0.66rem] leading-relaxed text-black/75">
            Let&apos;s do the exercise.
          </p>
        </div>
      </div>

      <div className="mt-auto space-y-1.5 pb-1">
        <div className="flex items-center gap-1.5">
          {["Grounding", "Why now?"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-[#0d6759]/25 px-2 py-1 text-[0.55rem] font-medium text-[#0d6759]"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-2">
          <MessageCircle className="size-3 text-black/25" />
          <span className="text-[0.6rem] text-black/30">Say what&apos;s going on…</span>
        </div>
      </div>
    </ReviveShell>
  );
}

function ReviveCommunityScreen() {
  const posts = [
    { who: "Anonymous", when: "12m", body: "Day 9. Slept through the night for the first time in weeks." },
    { who: "Anonymous", when: "1h", body: "Rough one today but I checked in anyway. That counts." },
    { who: "Anonymous", when: "3h", body: "Hit 100 days. Two months ago I didn't think I'd get here." },
  ];

  return (
    <ReviveShell>
      <p className="text-[0.7rem] font-medium text-black/45">Community</p>
      <p className="text-[1.2rem] font-semibold leading-tight tracking-tight">
        You&apos;re not doing this alone
      </p>

      <ul className="mt-3 space-y-2">
        {posts.map((post) => (
          <li
            key={post.body}
            className="rounded-2xl border border-black/[0.06] bg-white p-2.5"
          >
            <div className="flex items-center gap-1.5">
              <span className="grid size-4 place-items-center rounded-full bg-[#0d6759]/10 text-[0.45rem] font-bold text-[#0d6759]">
                A
              </span>
              <span className="text-[0.55rem] font-medium text-black/50">
                {post.who}
              </span>
              <span className="text-[0.5rem] text-black/30">· {post.when}</span>
            </div>
            <p className="mt-1.5 text-[0.66rem] leading-relaxed text-black/75">
              {post.body}
            </p>
            <div className="mt-1.5 flex items-center gap-1 text-[0.5rem] text-black/35">
              <Heart className="size-2.5" strokeWidth={2.5} /> Sent support
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-auto pb-1 text-center text-[0.5rem] leading-relaxed text-black/35">
        Posts are anonymous by default
      </p>
    </ReviveShell>
  );
}

function ReviveSettingsScreen() {
  const groups = [
    {
      label: "Privacy",
      rows: [
        { icon: Lock, name: "Local-first storage", value: "On" },
        { icon: Shield, name: "App lock", value: "Biometric" },
      ],
    },
    {
      label: "Support",
      rows: [
        { icon: Bell, name: "Check-in reminder", value: "9:00 PM" },
        { icon: Smartphone, name: "Panic Mode shortcut", value: "Enabled" },
      ],
    },
  ];

  return (
    <ReviveShell>
      <p className="text-[0.7rem] font-medium text-black/45">Settings</p>
      <p className="text-[1.2rem] font-semibold leading-tight tracking-tight">
        Your data, your rules
      </p>

      <div className="mt-3 space-y-3">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="text-[0.5rem] font-semibold uppercase tracking-wide text-black/35">
              {group.label}
            </p>
            <ul className="mt-1 overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
              {group.rows.map((row) => (
                <li
                  key={row.name}
                  className="flex items-center gap-2 border-b border-black/[0.05] px-2.5 py-2 last:border-b-0"
                >
                  <row.icon className="size-3 shrink-0 text-[#0d6759]" strokeWidth={2.2} />
                  <span className="flex-1 truncate text-[0.66rem] text-black/75">
                    {row.name}
                  </span>
                  <span className="text-[0.55rem] text-black/35">{row.value}</span>
                  <ChevronRight className="size-2.5 text-black/20" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-auto pb-1 text-center text-[0.5rem] leading-relaxed text-black/35">
        Recovery data stays on this device unless you sync it
      </p>
    </ReviveShell>
  );
}

/** The five core-experience screens, keyed to `reviveCaseStudy.experience`. */
export const reviveScreens = {
  dashboard: ReviveDashboardScreen,
  journey: ReviveJourneyScreen,
  coach: ReviveCoachScreen,
  community: ReviveCommunityScreen,
  settings: ReviveSettingsScreen,
} as const;

export type ReviveScreenKey = keyof typeof reviveScreens;

/* ------------------------------------------------------------------ */
/* Hydro                                                               */
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

/* ------------------------------------------------------------------ */

/**
 * Screen registry, keyed by app slug. `tone` tells the `Phone` frame which
 * status-bar/home-indicator colour keeps contrast against the screen.
 */
export const screens: Record<
  App["slug"],
  { Screen: () => React.JSX.Element; tone: PhoneTone }
> = {
  "awaz-khata": { Screen: AwazKhataScreen, tone: "dark" },
  revive: { Screen: ReviveDashboardScreen, tone: "light" },
  hydro: { Screen: HydroScreen, tone: "light" },
};
