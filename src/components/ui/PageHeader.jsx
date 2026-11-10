import AnimatedHeading from "./AnimatedHeading";

export default function PageHeader({ eyebrow, title, accentLast = 0, intro }) {
  return (
    <header className="mx-auto w-full max-w-6xl pb-16 pt-16 sm:pt-24">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{eyebrow}</p>
      <AnimatedHeading
        as="h1"
        text={title}
        accentLast={accentLast}
        delay={0.1}
        className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl"
      />
      {intro && <p className="mt-6 max-w-2xl text-lg text-slate-300">{intro}</p>}
    </header>
  );
}