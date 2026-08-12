import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Apps } from "@/components/apps";
import { AwazKhata } from "@/components/awaz-khata";
import { Showcase } from "@/components/showcase";
import { Achievements } from "@/components/achievements";
import { About } from "@/components/about";
import { Approach } from "@/components/approach";
import { Technology } from "@/components/technology";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        <Hero />
        <Stats />
        <Apps />
        <AwazKhata />
        <Showcase />
        <Achievements />
        <About />
        <Approach />
        <Technology />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
