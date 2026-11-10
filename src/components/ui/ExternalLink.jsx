import { ArrowUpRightIcon, GitHubIcon } from "./Icons";

const KINDS = {
  live: { label: "Live", Icon: ArrowUpRightIcon },
  code: { label: "Code", Icon: GitHubIcon },
};

export default function ExternalLink({ href, kind, name }) {
  const { label, Icon } = KINDS[kind];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} ${label.toLowerCase()}`}
      className="inline-flex items-center gap-1.5 text-sm text-white/80 transition hover:text-cyan-300"
    >
      <Icon />
      {label}
    </a>
  );
}