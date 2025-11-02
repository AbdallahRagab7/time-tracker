import { ProjectsContainer } from "@/features/projects/components/projects-container";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProjectsContainer />
      </main>
    </div>
  );
}
