"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import type { Project } from "@/features/shared/types";

interface ProjectGridProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export function ProjectGrid({ projects, onEdit, onDelete }: ProjectGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        const hours = Math.floor(9000 / 3600);
        const minutes = Math.floor((9000 % 3600) / 60);

        return (
          <Card
            key={project.id}
            className="border-border bg-card hover:border-primary/50 transition-colors"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>
                      {project.client || "No client"}
                    </CardDescription>
                  </div>
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded ${
                    project.status === "active"
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {project.status}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Rate</div>
                  <div className="text-lg font-semibold text-foreground">
                    {project.currency} {project.hourlyRate}/hr
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Total Time
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {String(hours).padStart(2, "0")}:
                    {String(minutes).padStart(2, "0")}
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">time entries</div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <Button
                  onClick={() => onEdit(project)}
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    if (confirm("Delete this project?")) {
                      onDelete(project.id);
                    }
                  }}
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
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
  );
}
