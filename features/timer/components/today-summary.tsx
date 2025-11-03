"use client";

import { useProjectStore } from "@/features/projects/store/project-store";
import { useStatsStore } from "@/features/reports/store/stats-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TodaySummary() {
  const { projects } = useProjectStore();
  const { getTodaysStats } = useStatsStore();

  const stats = getTodaysStats();

  const formatTime = (seconds: number) => {
    return `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(
      Math.floor((seconds % 3600) / 60)
    ).padStart(2, "0")}`;
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg">Today's Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Total Time</div>
          <div className="text-3xl font-bold text-primary">
            {formatTime(stats.totalTime)}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Billable</div>
          <div className="text-2xl font-bold text-foreground">
            {formatTime(stats.billableTime)}
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
