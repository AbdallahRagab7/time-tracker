"use client";

import { useState, useEffect } from "react";
import { useProjectStore } from "../store/project-store";
import { useEntriesStore } from "@/features/entries/store/entries-store";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddProjectModal } from "./add-project-modal";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/features/shared/types";

export function ProjectsContainer() {
  const { projects, deleteProject } = useProjectStore();
  const { entries } = useEntriesStore();
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
    const projectEntries = entries.filter((e) => e.projectId === projectId);
    const totalTime = projectEntries.reduce((sum, e) => sum + e.duration, 0);
    const billableTime = projectEntries
      .filter((e) => e.billable)
      .reduce((sum, e) => sum + e.duration, 0);
    return { totalTime, billableTime, count: projectEntries.length };
  };

  if (!mounted) return null;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-foreground">Projects</h1>
        <Button
          onClick={() => {
            setEditingProject(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2"
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
        onOpenChange={(open) => {
          setShowModal(open);
          if (!open) {
            setEditingProject(null);
          }
        }}
        editingProject={editingProject}
        onClose={() => {
          setShowModal(false);
          setEditingProject(null);
        }}
      />
    </>
  );
}
