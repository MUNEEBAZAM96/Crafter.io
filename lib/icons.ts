import {
  Brain,
  CalendarCheck,
  Gauge,
  Globe,
  Heart,
  Languages,
  LifeBuoy,
  Mic,
  Receipt,
  Rocket,
  Shield,
  Smartphone,
  Sparkles,
  Store,
  Target,
  Trophy,
  Users,
  Wallet,
  Wind,
  type LucideIcon,
} from "lucide-react";

/**
 * Content in `lib/data/` references icons by name so the data stays
 * serialisable and editable without touching component imports. Add an icon
 * here before referencing it from a data file.
 */
export const icons = {
  brain: Brain,
  calendarCheck: CalendarCheck,
  gauge: Gauge,
  globe: Globe,
  heart: Heart,
  languages: Languages,
  lifeBuoy: LifeBuoy,
  mic: Mic,
  receipt: Receipt,
  rocket: Rocket,
  shield: Shield,
  smartphone: Smartphone,
  sparkles: Sparkles,
  store: Store,
  target: Target,
  trophy: Trophy,
  users: Users,
  wallet: Wallet,
  wind: Wind,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;
