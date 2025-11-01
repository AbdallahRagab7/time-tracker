import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { Project } from "@/types/project";

// Fake data for projects
const fakeProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    client: "Acme Corp",
    color: "#3B82F6",
    hourlyRate: 75,
    currency: "USD",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Mobile App Development",
    client: "TechStart Inc",
    color: "#10B981",
    hourlyRate: 100,
    currency: "USD",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Brand Identity",
    client: "Creative Agency",
    color: "#F59E0B",
    hourlyRate: 85,
    currency: "USD",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "E-commerce Platform",
    client: "ShopSmart",
    color: "#EF4444",
    hourlyRate: 95,
    currency: "USD",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Legacy Project",
    client: "Old Client",
    color: "#8B5CF6",
    hourlyRate: 60,
    currency: "USD",
    status: "archived",
    createdAt: new Date().toISOString(),
  },
];

// Fake time entries data (in seconds)
const fakeTimeEntries = [
  { projectId: "1", duration: 14400, billable: true }, // 4 hours
  { projectId: "1", duration: 7200, billable: true }, // 2 hours
  { projectId: "2", duration: 18000, billable: true }, // 5 hours
  { projectId: "2", duration: 10800, billable: false }, // 3 hours
  { projectId: "3", duration: 12600, billable: true }, // 3.5 hours
  { projectId: "4", duration: 9000, billable: true }, // 2.5 hours
  { projectId: "4", duration: 5400, billable: true }, // 1.5 hours
];

function getProjectStats(projectId: string) {
  const entries = fakeTimeEntries.filter((e) => e.projectId === projectId);
  const totalTime = entries.reduce((sum, e) => sum + e.duration, 0);
  const billableTime = entries
    .filter((e) => e.billable)
    .reduce((sum, e) => sum + e.duration, 0);

  return {
    totalTime,
    billableTime,
    count: entries.length,
  };
}

export default function ProjectsPage() {
  const projects = fakeProjects;

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <Button className="flex items-center gap-2">
            <Plus className="size-4" />
            New Project
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const stats = getProjectStats(project.id);

            return (
              <ProjectCard key={project.id} project={project} stats={stats} />
            );
          })}

          {projects.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground mb-4">
                No projects yet. Create one to get started.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
