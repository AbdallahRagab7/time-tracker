"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit2, Trash2 } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  stats: {
    totalTime: number;
    billableTime: number;
    count: number;
  };
}

export function ProjectCard({ project, stats }: ProjectCardProps) {
  const hours = Math.floor(stats.totalTime / 3600);
  const minutes = Math.floor((stats.totalTime % 3600) / 60);

  return (
    <Card className="border-border bg-card hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <div>
              <CardTitle className="text-base">{project.name}</CardTitle>
              <CardDescription>{project.client || "No client"}</CardDescription>
            </div>
          </div>
          <div
            className={`text-xs px-2 py-1 rounded capitalize ${
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
            <p className="text-sm text-muted-foreground">Rate</p>
            <p className="font-semibold text-foreground">
              {project.currency} {project.hourlyRate}/hr
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Time</p>
            <div className="font-semibold text-foreground">
              {String(hours).padStart(2, "0")}:
              {String(minutes).padStart(2, "0")}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {stats.count} time entr{stats.count === 1 ? "y" : "ies"}
        </p>

        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 flex items-center justify-center gap-2 py-2"
          >
            <Edit2 className="w-4 h-4" />
            <span className="leading-none">Edit</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex-1 py-2 flex items-center justify-center gap-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
            <span className="leading-none">Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
