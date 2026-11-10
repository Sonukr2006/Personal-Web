import CtaBand from "@/components/sections/CtaBand";
import Chip from "@/components/ui/Chip";
import CountUp from "@/components/ui/CountUp";
import InView from "@/components/ui/InView";
import PageHeader from "@/components/ui/PageHeader";
import ScrollWords from "@/components/ui/ScrollWords";
import Section from "@/components/ui/Section";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Timeline from "@/components/ui/Timeline";
import TiltCard from "@/components/ui/TiltCard";
import { bio, highlights, skillGroups, stats } from "@/data/about";

export const metadata = {
  title: "About",
  description: "Sonu Kumar, B.Tech CSE student from Bihar, backend-focused, aspiring founder.",
};

function StatsGrid() {
  return (
    <ul className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map(({ id, value, decimals, suffix, label }, index) => (
        <InView key={id} as="li" delay={index * 100} className="h-full">
          <TiltCard>
            <p className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
              <CountUp to={value} decimals={decimals} suffix={suffix} />
            </p>
            <p className="mt-3 text-xs text-slate-400">{label}</p>
          </TiltCard>
        </InView>
      ))}
    </ul>
  );
}

function SkillsGrid() {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map(({ label, items }, index) => (
        <InView key={label} as="li" delay={(index % 3) * 100} className="h-full">
          <SpotlightCard className="h-full">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
              {label}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {items.map((item) => (
                <li key={item}>
                  <Chip>{item}</Chip>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </InView>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  return (
    <main className="px-6 pb-12">
      <PageHeader
        eyebrow="About"
        title="Engineer today, founder tomorrow."
        accentLast={2}
        intro="Third-year B.Tech CSE student at CGC University Mohali, from Bihar."
      />

      <section aria-label="Introduction" className="mx-auto w-full max-w-4xl py-12">
        <ScrollWords
          text={bio.join(" ")}
          className="text-3xl font-semibold leading-snug text-white sm:text-5xl"
        />
      </section>

      <StatsGrid />

      <Section id="skills" eyebrow="Toolkit" title="Skills" width="lg">
        <SkillsGrid />
      </Section>

      <Section id="highlights" eyebrow="Milestones" title="Highlights" width="lg">
        <Timeline items={highlights} />
      </Section>

      <CtaBand />
    </main>
  );
}