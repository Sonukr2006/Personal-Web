const WIDTHS = {
  md: "max-w-3xl",
  lg: "max-w-5xl",
};

export default function Section({ id, eyebrow, title, width = "md", children }) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`mx-auto w-full ${WIDTHS[width]} py-24`}
    >
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{eyebrow}</p>
      <h2 id={headingId} className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}