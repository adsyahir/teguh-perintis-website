import ProjectCard from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export default function FeaturedProjects() {
  const featured = siteConfig.projects.filter((p) => p.featured);

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            viewLabel={siteConfig.projectPage.viewProject}
          />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/projects" variant="secondary">
          View All Projects
        </Button>
      </div>
    </>
  );
}
