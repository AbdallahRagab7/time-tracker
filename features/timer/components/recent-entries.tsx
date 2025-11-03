"use client";

import { useProjectStore } from "@/features/projects/store/project-store";
import { useEntriesStore } from "@/features/entries/store/entries-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export function RecentEntries() {
  const { projects } = useProjectStore();
  const { deleteEntry, getEntriesByDate } = useEntriesStore();

  const today = new Date().toISOString().split("T")[0];
  const todaysEntries = getEntriesByDate(today);
  const recentEntries = todaysEntries.slice(0, 7);

  const formatTime = (seconds: number) => {
    return `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(
      Math.floor((seconds % 3600) / 60)
    ).padStart(2, "0")}`;
  };

  return (
    <div className="mt-8">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
          <CardDescription>Last 7 entries from today</CardDescription>
        </CardHeader>
        <CardContent>
          {recentEntries.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No entries yet today
            </p>
          ) : (
            <div className="space-y-3">
              {recentEntries.map((entry) => {
                const project = projects.find((p) => p.id === entry.projectId);
                const startHour = new Date(entry.startTime).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );
                const endHour = new Date(entry.endTime).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );

                return (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: project?.color }}
                        />
                        <span className="font-medium text-foreground">
                          {entry.task}
                        </span>
                        {entry.billable && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                            Billable
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {startHour} – {endHour} • {formatTime(entry.duration)}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="ml-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
