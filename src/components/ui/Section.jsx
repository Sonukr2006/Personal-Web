import AnimatedHeading from "./AnimatedHeading";

const WIDTHS = {
  md: "max-w-3xl",
  lg: "max-w-6xl",
};

export default function Section({ id, eyebrow, title, width = "md", children }) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`mx-auto w-full ${WIDTHS[width]} py-20`}
    >
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{eyebrow}</p>
      <AnimatedHeading
        id={headingId}
        text={title}
        onScroll
        className="mt-3 text-3xl font-semibold text-white sm:text-5xl"
      />
      <div className="mt-10">{children}</div>
    </section>
  );
}