"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEntriesStore } from "@/features/entries/store/entries-store";
import { useProjectStore } from "@/features/projects/store/project-store";
import { manualEntrySchema, type ManualEntryFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TimeEntry } from "@/features/shared/types";

interface ManualEntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManualEntryModal({
  open,
  onOpenChange,
}: ManualEntryModalProps) {
  const { projects } = useProjectStore();
  const { addEntry } = useEntriesStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ManualEntryFormData>({
    resolver: zodResolver(manualEntrySchema) as any,
    defaultValues: {
      projectId: "",
      task: "",
      date: new Date().toISOString().split("T")[0] as string,
      startTime: "09:00",
      endTime: "10:00",
      billable: true,
      notes: "",
    },
  });

  const projectId = watch("projectId");

  const onSubmit = (data: ManualEntryFormData) => {
    const startDateTime = new Date(`${data.date}T${data.startTime}`);
    const endDateTime = new Date(`${data.date}T${data.endTime}`);
    const duration = Math.floor(
      (endDateTime.getTime() - startDateTime.getTime()) / 1000
    );

    const entry: TimeEntry = {
      id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      projectId: data.projectId,
      task: data.task,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      duration,
      billable: data.billable,
      tags: [],
      notes: data.notes,
      date: data.date,
      createdAt: new Date().toISOString(),
    };

    addEntry(entry);
    reset();
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      reset();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-border bg-card">
        <DialogHeader>
          <DialogTitle>Add Time Entry</DialogTitle>
          <DialogDescription>Manually add a time entry</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label htmlFor="projectId" className="text-foreground">
              Project <span className="text-destructive">*</span>
            </label>
            <Select
              value={projectId}
              onValueChange={(value) =>
                setValue("projectId", value, { shouldValidate: true })
              }
            >
              <SelectTrigger
                id="projectId"
                className="border-border bg-background"
              >
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {projects.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: p.color }}
                      />
                      {p.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.projectId && (
              <p className="error">{errors.projectId.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="task" className="text-foreground">
              Task <span className="text-destructive">*</span>
            </label>
            <Input
              id="task"
              placeholder="What did you work on?"
              className="border-border bg-background"
              {...register("task")}
            />
            {errors.task && <p className="error">{errors.task.message}</p>}
          </div>

          <div>
            <label htmlFor="date" className="text-foreground">
              Date <span className="text-destructive">*</span>
            </label>
            <Input
              id="date"
              type="date"
              className="border-border bg-background"
              {...register("date")}
            />
            {errors.date && <p className="error">{errors.date.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="text-foreground">
                Start Time <span className="text-destructive">*</span>
              </label>
              <Input
                id="startTime"
                type="time"
                className="border-border bg-background"
                {...register("startTime")}
              />
              {errors.startTime && (
                <p className="error">{errors.startTime.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="endTime" className="text-foreground">
                End Time <span className="text-destructive">*</span>
              </label>
              <Input
                id="endTime"
                type="time"
                className="border-border bg-background"
                {...register("endTime")}
              />
              {errors.endTime && (
                <p className="error">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="text-foreground">
              Notes
            </label>
            <Input
              id="notes"
              placeholder="Add any notes..."
              className="border-border bg-background"
              {...register("notes")}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="billable"
              {...register("billable")}
              onCheckedChange={(checked) =>
                register("billable").onChange({ target: { checked } })
              }
            />
            <label
              htmlFor="billable"
              className="text-foreground cursor-pointer"
            >
              Billable Hours
            </label>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Entry"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
