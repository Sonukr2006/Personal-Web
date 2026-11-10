import ProjectCard from "@/components/projects/ProjectCard";
import CtaBand from "@/components/sections/CtaBand";
import InView from "@/components/ui/InView";
import PageHeader from "@/components/ui/PageHeader";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects",
  description: "Things Sonu Kumar has built: backends, full-stack apps, and competition winners.",
};

export default function ProjectsPage() {
  return (
    <main className="px-6 pb-12">
      <PageHeader
        eyebrow="Work"
        title="Things I've built."
        accentLast={1}
        intro="Backends, full-stack apps, and a couple of competition wins. Open any project for the details."
      />

      <ul className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <InView
            key={project.slug}
            as="li"
            delay={(index % 2) * 120}
            className={`h-full ${project.featured ? "md:col-span-2" : ""}`}
          >
            <ProjectCard project={project} index={index} />
          </InView>
        ))}
      </ul>

      <CtaBand />
    </main>
  );
}