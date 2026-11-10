import Hero from "@/components/sections/Hero";
import TechMarquee from "@/components/sections/TechMarquee";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import CtaBand from "@/components/sections/CtaBand";

export default function Home() {
  return (
    <main className="px-6 pb-12">
      <Hero />
      <TechMarquee />
      <FeaturedProjects />
      <CtaBand />
    </main>
  );
}