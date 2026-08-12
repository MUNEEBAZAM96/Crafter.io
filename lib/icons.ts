import {
  Brain,
  Gauge,
  Globe,
  Heart,
  Languages,
  Mic,
  Receipt,
  Rocket,
  Smartphone,
  Sparkles,
  Store,
  Target,
  Trophy,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/**
 * Content in `lib/content.ts` references icons by name so the data stays
 * serialisable and editable without touching component imports.
 */
export const icons = {
  brain: Brain,
  gauge: Gauge,
  globe: Globe,
  heart: Heart,
  languages: Languages,
  mic: Mic,
  receipt: Receipt,
  rocket: Rocket,
  smartphone: Smartphone,
  sparkles: Sparkles,
  store: Store,
  target: Target,
  trophy: Trophy,
  users: Users,
  wallet: Wallet,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;
