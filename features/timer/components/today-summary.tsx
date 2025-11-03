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
          <div className="text-3xl font-bold text-primary">
            {formatTime(stats.totalTime)}
            <span className="texs-sm">m</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Billable</div>
          <div className="text-2xl font-bold text-foreground">
            {formatTime(stats.billableTime)}m
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Entries</div>
          <div className="text-2xl font-bold text-foreground">
            {stats.entryCount}
          </div>
        </div>

        {Object.keys(stats.byProject).length > 0 && (
          <div className="space-y-3 border-t border-border pt-4">
            <div className="text-sm font-semibold text-foreground">
              By Project
            </div>
            {Object.entries(stats.byProject).map(([projectId, duration]) => {
              const project = projects.find((p) => p.id === projectId);
              return (
                <div
                  key={projectId}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: project?.color }}
                    />
                    <span className="text-muted-foreground">
                      {project?.name}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">
                    {formatTime(duration)}
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
