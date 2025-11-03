"use client";

import { Edit2, Trash2 } from "lucide-react";
import type { TimeEntry } from "@/features/shared/types";

interface EntryCardProps {
  entry: TimeEntry;
  project?: { id: string; name: string; color: string };
  onEdit: (entry: TimeEntry) => void;
  onDelete: (id: string) => void;
}

export function EntryCard({
  entry,
  project,
  onEdit,
  onDelete,
}: EntryCardProps) {
  const hours = Math.floor(entry.duration / 3600);
  const minutes = Math.floor((entry.duration % 3600) / 60);
  const date = new Date(entry.date).toLocaleDateString();

  const cells = [
    {
      content: (
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: project?.color }}
          />
          <span className="text-foreground">{project?.name}</span>
        </div>
      ),
      className: "",
    },
    {
      content: <span className="text-foreground">{entry.task}</span>,
      className: "",
    },
    {
      content: <span className="text-muted-foreground">{date}</span>,
      className: "",
    },
    {
      content: (
        <span className="text-foreground font-mono">
          {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
        </span>
      ),
      className: "",
    },
    {
      content: entry.billable ? (
        <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
          Yes
        </span>
      ) : (
        <span className="text-muted-foreground text-xs">No</span>
      ),
      className: "",
    },
    {
      content: (
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
      ),
      className: "text-right",
    },
  ];

  return (
    <tr className="border-b border-border hover:bg-background/50 transition-colors">
      {cells.map((cell, index) => (
        <td key={index} className={`py-3 px-4 ${cell.className}`}>
          {cell.content}
        </td>
      ))}
    </tr>
  );
}
