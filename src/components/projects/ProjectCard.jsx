import Link from "next/link";
import Chip from "@/components/ui/Chip";
import ExternalLink from "@/components/ui/ExternalLink";
import LiveBadge from "@/components/ui/LiveBadge";
import TiltCard from "@/components/ui/TiltCard";
import { ArrowUpRightIcon } from "@/app/components/ui/Icons";

const MAX_STACK_CHIPS = 4;

export default function ProjectCard({ project, index }) {
  const { slug, name, role, description, stack, featured, live, highlight, liveUrl, repoUrl } =
    project;

  return (
    <TiltCard as="article">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-white/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          {live && <LiveBadge />}
        </div>

        <h3 className={`mt-4 font-semibold ${featured ? "text-4xl" : "text-2xl"}`}>
          <Link href={`/projects/${slug}`} className="after:absolute after:inset-0">
            {name}
          </Link>
        </h3>
        <p className="mt-1 text-xs uppercase tracking-wider text-cyan-200">{role}</p>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">{description}</p>

        {highlight && (
          <div className="mt-4">
            <Chip tone="accent">{highlight}</Chip>
          </div>
        )}

        {stack.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${name} tech stack`}>
            {stack.slice(0, MAX_STACK_CHIPS).map((tech) => (
              <li key={tech}>
                <Chip>{tech}</Chip>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
            View case study
            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </span>
          <div className="relative z-10 flex gap-4">
            {liveUrl && <ExternalLink href={liveUrl} kind="live" name={name} />}
            {repoUrl && <ExternalLink href={repoUrl} kind="code" name={name} />}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}