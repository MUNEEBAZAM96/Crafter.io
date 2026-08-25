import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Apps } from "@/components/apps";
import { Revive } from "@/components/revive";
import { AwazKhata } from "@/components/awaz-khata";
import { AppShowcase } from "@/components/app-showcase";
import { Approach } from "@/components/approach";
import { Technology } from "@/components/technology";
import { About } from "@/components/about";
import { Founder } from "@/components/founder";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { CursorSpotlight } from "@/components/motion/cursor-spotlight";
import { ScrollProgress } from "@/components/motion/scroll-progress";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <CursorSpotlight />

      <Navbar />

      <main id="main" className="flex-1">
        <Hero />
        <Intro />
        <Apps />
        <Revive />
        <AwazKhata />
        <AppShowcase />
        <Approach />
        <Technology />
        <About />
        <Founder />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
