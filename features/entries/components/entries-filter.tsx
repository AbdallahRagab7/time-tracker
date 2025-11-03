"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useProjectStore } from "@/features/projects/store/project-store";

interface EntriesFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterProject: string;
  onProjectChange: (value: string) => void;
  sortBy: "date" | "duration" | "project";
  onSortChange: (value: "date" | "duration" | "project") => void;
  dateFrom: string;
  onDateFromChange: (value: string) => void;
  dateTo: string;
  onDateToChange: (value: string) => void;
}

export function EntriesFilter({
  searchTerm,
  onSearchChange,
  filterProject,
  onProjectChange,
  sortBy,
  onSortChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
}: EntriesFilterProps) {
  const { projects } = useProjectStore();

  return (
    <Card className="border-border bg-card mb-6">
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-5">
          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Search Task
            </label>
            <Input
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Search..."
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              From Date
            </label>
            <Input type="date" value={dateFrom} onChange={onDateFromChange} />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              To Date
            </label>
            <Input type="date" value={dateTo} onChange={onDateToChange} />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Project
            </label>
            <Select value={filterProject} onValueChange={onProjectChange}>
              <SelectTrigger className="border-border bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Sort By
            </label>
            <Select
              value={sortBy}
              onValueChange={(v) => onSortChange(v as any)}
            >
              <SelectTrigger className="border-border bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
                <SelectItem value="project">Project</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
