"use client";

import { useMemo } from "react";
import { useProjectStore } from "@/features/projects/store/project-store";
import { useEntriesStore } from "@/features/entries/store/entries-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TodaySummary() {
  const { projects } = useProjectStore();
  // Subscribe to entries to trigger re-render when entries change
  const entries = useEntriesStore((state) => state.entries);

  // Calculate stats from reactive entries
  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const todaysEntries = entries.filter((e) => e.date === today);

    const totalTime = todaysEntries.reduce((sum, e) => sum + e.duration, 0);
    const billableTime = todaysEntries
      .filter((e) => e.billable)
      .reduce((sum, e) => sum + e.duration, 0);

    const byProject: Record<string, number> = {};
    todaysEntries.forEach((e) => {
      byProject[e.projectId] = (byProject[e.projectId] || 0) + e.duration;
    });

    return {
      totalTime,
      billableTime,
      entryCount: todaysEntries.length,
      byProject,
    };
  }, [entries]);

  const formatTime = (seconds: number) => {
    return `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(
      Math.floor((seconds % 3600) / 60)
    ).padStart(2, "0")}`;
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg">Today&apos;s Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Total Time</div>
          <p className="text-3xl font-semibold text-primary">
            {formatTime(stats.totalTime)}
            <span className="texs-sm">m</span>
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Billable</p>
          <p className="text-2xl font-semibold text-foreground">
            {formatTime(stats.billableTime)}m
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Entries</p>
          <p className="text-2xl font-semibold text-foreground">
            {stats.entryCount}
          </p>
        </div>

        {Object.keys(stats.byProject).length > 0 && (
          <div className="space-y-3 border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-foreground">
              By Project
            </h3>
            {Object.entries(stats.byProject).map(([projectId, duration]) => {
              const project = projects.find((p) => p.id === projectId);
              if (!project) return null;

              return (
                <div
                  key={projectId}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="text-muted-foreground">
                      {project.name}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">
                    {formatTime(duration)}m
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
