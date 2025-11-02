"use client";

import { useState, useEffect } from "react";
import { useProjectStore } from "../store/project-store";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddProjectModal } from "./add-project-modal";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/types";

export function ProjectsContainer() {
  const { projects, deleteProject } = useProjectStore();
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const getProjectStats = (projectId: string) => {
    // Generate fake data
    const count = Math.floor(Math.random() * 10) + 1; // 1-10 entries
    const totalTime = Math.floor(Math.random() * 10000) + 1000; // 1000-11000 seconds
    const billableTime = Math.floor(totalTime * (0.7 + Math.random() * 0.3)); // 70-100% of total time
    
    return { totalTime, billableTime, count };
  };

  if (!mounted) return null;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Projects</h1>
        <Button
          onClick={() => {
            setEditingProject(null);
            setShowModal(true);
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const stats = getProjectStats(project.id);

          return (
            <ProjectCard
              key={project.id}
              project={project}
              stats={stats}
              onEdit={openEdit}
              onDelete={deleteProject}
            />
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

      <AddProjectModal
        open={showModal}
        onOpenChange={setShowModal}
        editingProject={editingProject}
        onClose={() => {
          setEditingProject(null);
        }}
      />
    </>
  );
}
