import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/sections/CtaBand";
import ButtonLink from "@/components/ui/ButtonLink";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import InView from "@/components/ui/InView";
import LiveBadge from "@/components/ui/LiveBadge";
import PageHeader from "@/components/ui/PageHeader";
import ScrollWords from "@/components/ui/ScrollWords";
import { getNextProject, getProjectBySlug, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return project ? { title: project.name, description: project.description } : {};
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getNextProject(slug);
  const { name, role, description, overview, points, stack, live, highlight, liveUrl, repoUrl } =
    project;

  return (
    <main className="px-6 pb-12">
      <div className="mx-auto w-full max-w-6xl pt-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <span aria-hidden="true">←</span> All projects
        </Link>
      </div>

      <PageHeader eyebrow={role} title={name} intro={description} />

      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_2fr]">
        <InView>
          <Card className="space-y-6">
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="text-slate-400">Role</dt>
                <dd className="mt-1 text-white">{role}</dd>
              </div>
              {live && (
                <div>
                  <dt className="text-slate-400">Status</dt>
                  <dd className="mt-2">
                    <LiveBadge />
                  </dd>
                </div>
              )}
              {highlight && (
                <div>
                  <dt className="text-slate-400">Recognition</dt>
                  <dd className="mt-2">
                    <Chip tone="accent">{highlight}</Chip>
                  </dd>
                </div>
              )}
              {stack.length > 0 && (
                <div>
                  <dt className="text-slate-400">Stack</dt>
                  <dd className="mt-2">
                    <ul className="flex flex-wrap gap-2">
                      {stack.map((tech) => (
                        <li key={tech}>
                          <Chip>{tech}</Chip>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>

            {(liveUrl || repoUrl) && (
              <div className="flex flex-wrap gap-3">
                {liveUrl && <ButtonLink href={liveUrl}>Visit live site</ButtonLink>}
                {repoUrl && (
                  <ButtonLink href={repoUrl} variant="secondary">
                    View code
                  </ButtonLink>
                )}
              </div>
            )}
          </Card>
        </InView>

        <div>
          {overview.length > 0 ? (
            <ScrollWords
              text={overview.join(" ")}
              className="text-2xl font-medium leading-snug text-white sm:text-3xl"
            />
          ) : (
            <InView>
              <Card>
                <p className="text-slate-300">Detailed write-up coming soon.</p>
              </Card>
            </InView>
          )}

          {points.length > 0 && (
            <ul className="mt-10 space-y-4">
              {points.map((point) => (
                <InView key={point} as="li">
                  <div className="flex gap-3 text-slate-200">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300"
                    />
                    {point}
                  </div>
                </InView>
              ))}
            </ul>
          )}
        </div>
      </div>

      {next.slug !== slug && (
        <Link
          href={`/projects/${next.slug}`}
          className="group mx-auto mt-24 block w-full max-w-6xl border-t border-white/10 py-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Next project</p>
          <p className="mt-3 flex items-center justify-between text-4xl font-bold text-white transition-colors group-hover:text-cyan-200 sm:text-6xl">
            {next.name}
            <ArrowUpRightIcon className="h-8 w-8 transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 sm:h-12 sm:w-12" />
          </p>
        </Link>
      )}

      <CtaBand />
    </main>
  );
}