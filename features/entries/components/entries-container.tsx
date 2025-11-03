"use client";

import { useState, useEffect } from "react";
import { useProjectStore } from "@/features/projects/store/project-store";
import { useEntriesStore } from "@/features/entries/store/entries-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { ManualEntryModal } from "./manual-entry-modal";
import { EditEntryModal } from "./edit-entry-modal";
import { EntryCard } from "./entry-card"; // importing EntryCard component
import type { TimeEntry } from "@/features/shared/types";

export function EntriesContainer() {
  const { projects } = useProjectStore();
  const { entries, deleteEntry, updateEntry } = useEntriesStore();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProject, setFilterProject] = useState("all");
  const [sortBy, setSortBy] = useState<"date" | "duration" | "project">("date");
  const [showManualModal, setShowManualModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    setMounted(true);
    const today = new Date().toISOString().split("T")[0];
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    setDateFrom(sevenDaysAgo);
    setDateTo(today);
  }, []);

  let filtered = entries;

  if (dateFrom && dateTo) {
    filtered = filtered.filter((e) => e.date >= dateFrom && e.date <= dateTo);
  }

  if (filterProject !== "all") {
    filtered = filtered.filter((e) => e.projectId === filterProject);
  }

  if (searchTerm) {
    filtered = filtered.filter((e) =>
      e.task.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortBy === "duration") {
    filtered = [...filtered].sort((a, b) => b.duration - a.duration);
  } else if (sortBy === "project") {
    filtered = [...filtered].sort((a, b) =>
      a.projectId.localeCompare(b.projectId)
    );
  } else {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  if (!mounted) return null;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Time Entries</h1>
        <Button onClick={() => setShowManualModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Entry
        </Button>
      </div>

      <Card className="border-border bg-card mb-6">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-5">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                Search Task
              </label>
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-border bg-background"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                From Date
              </label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="border-border bg-background"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                To Date
              </label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="border-border bg-background"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                Project
              </label>
              <Select value={filterProject} onValueChange={setFilterProject}>
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
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
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

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Entries ({filtered.length})</CardTitle>
          <CardDescription>Showing all time entries</CardDescription>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No entries found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {[
                      "Project",
                      "Task",
                      "Date",
                      "Duration",
                      "Billable",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className={`py-3 px-4 font-semibold text-foreground ${
                          header === "Actions" ? "text-right" : "text-left"
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((entry) => {
                    const project = projects.find(
                      (p) => p.id === entry.projectId
                    );
                    return (
                      <EntryCard
                        key={entry.id}
                        entry={entry}
                        project={project}
                        onEdit={setEditingEntry}
                        onDelete={deleteEntry}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <ManualEntryModal
        open={showManualModal}
        onOpenChange={setShowManualModal}
      />
      {editingEntry && (
        <EditEntryModal
          entry={editingEntry}
          onOpenChange={(open) => !open && setEditingEntry(null)}
          onSave={(updates) => {
            updateEntry(editingEntry.id, updates);
            setEditingEntry(null);
          }}
        />
      )}
    </>
  );
}
