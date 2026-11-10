import ProjectCard from "@/components/projects/ProjectCard";
import ButtonLink from "@/components/ui/ButtonLink";
import InView from "@/components/ui/InView";
import Section from "@/components/ui/Section";
import { projects } from "@/data/projects";

const FEATURED_COUNT = 3;
const STAGGER_MS = 120;

export default function FeaturedProjects() {
  return (
    <Section id="featured-projects" eyebrow="Selected work" title="Projects" width="lg">
      <ul className="grid gap-6 md:grid-cols-3">
        {projects.slice(0, FEATURED_COUNT).map((project, index) => (
          <InView key={project.slug} as="li" delay={index * STAGGER_MS} className="h-full">
            <ProjectCard project={project} index={index} />
          </InView>
        ))}
      </ul>
      <div className="mt-10">
        <ButtonLink href="/projects" variant="secondary">
          View all projects
        </ButtonLink>
      </div>
    </Section>
  );
}