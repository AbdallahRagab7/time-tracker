"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit2, Trash2 } from "lucide-react";
import type { TimeEntry } from "@/features/shared/types";
import { useProjectStore } from "@/features/projects/store/project-store";

interface EntriesTableProps {
  entries: TimeEntry[];
  onEdit: (entry: TimeEntry) => void;
  onDelete: (entryId: string) => void;
}

export function EntriesTable({ entries, onEdit, onDelete }: EntriesTableProps) {
  const { projects } = useProjectStore();

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>Entries ({entries.length})</CardTitle>
        <CardDescription>Showing all time entries</CardDescription>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No entries found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Project
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Task
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Duration
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Billable
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => {
                  const project = projects.find(
                    (p) => p.id === entry.projectId
                  );
                  const hours = Math.floor(entry.duration / 3600);
                  const minutes = Math.floor((entry.duration % 3600) / 60);
                  const date = new Date(entry.date).toLocaleDateString();

                  return (
                    <tr
                      key={entry.id}
                      className="border-b border-border hover:bg-background/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: project?.color }}
                          />
                          <span className="text-foreground">
                            {project?.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-foreground">
                        {entry.task}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {date}
                      </td>
                      <td className="py-3 px-4 text-foreground font-mono">
                        {String(hours).padStart(2, "0")}:
                        {String(minutes).padStart(2, "0")}
                      </td>
                      <td className="py-3 px-4">
                        {entry.billable ? (
                          <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                            Yes
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            No
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => onEdit(entry)}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("Delete this entry?")) {
                                onDelete(entry.id);
                              }
                            }}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
