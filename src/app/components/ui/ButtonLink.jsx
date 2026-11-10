import Link from "next/link";

const VARIANTS = {
  primary: "bg-cyan-300 text-black hover:bg-cyan-200",
  secondary: "border border-white/30 text-white hover:bg-white/10",
};

const isExternal = (href) => /^https?:\/\//.test(href);

export default function ButtonLink({ href, variant = "primary", children }) {
  const className = `rounded-full px-6 py-2.5 text-sm font-semibold transition ${VARIANTS[variant]}`;

  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}