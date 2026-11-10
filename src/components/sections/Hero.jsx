import ButtonLink from "@/components/ui/ButtonLink";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/data/site";

const HERO_REVEAL_DELAY_S = 2;

export default function Hero() {
  const { eyebrow, headline, intro } = site;

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center">
      <Reveal delay={HERO_REVEAL_DELAY_S} className="max-w-2xl">
        <p data-reveal className="invisible text-sm uppercase tracking-[0.3em] text-cyan-200">
          {eyebrow}
        </p>

        <h1
          data-reveal
          className="invisible mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl"
        >
          {headline.lead}{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
            {headline.highlight}
          </span>
        </h1>

        <p data-reveal className="invisible mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
          {intro}
        </p>

        <div data-reveal className="invisible mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/projects">View projects</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact me
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}