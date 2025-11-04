"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editEntrySchema, type EditEntryFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TimeEntry } from "@/features/shared/types";

interface EditEntryModalProps {
  entry: TimeEntry;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: Partial<TimeEntry>) => void;
}

export function EditEntryModal({
  entry,
  onOpenChange,
  onSave,
}: EditEntryModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditEntryFormData>({
    resolver: zodResolver(editEntrySchema) as any,
    defaultValues: {
      task: entry.task,
      startTime: new Date(entry.startTime)
        .toLocaleTimeString("en-US", { hour12: false })
        .slice(0, 5),
      endTime: new Date(entry.endTime)
        .toLocaleTimeString("en-US", { hour12: false })
        .slice(0, 5),
      billable: entry.billable ?? true,
      notes: entry.notes ?? "",
    },
  });

  const onSubmit = (data: EditEntryFormData) => {
    const startDateTime = new Date(`${entry.date}T${data.startTime}`);
    const endDateTime = new Date(`${entry.date}T${data.endTime}`);
    const duration = Math.floor(
      (endDateTime.getTime() - startDateTime.getTime()) / 1000
    );

    onSave({
      task: data.task,
      notes: data.notes,
      billable: data.billable,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      duration,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card">
        <DialogHeader>
          <DialogTitle>Edit Time Entry</DialogTitle>
          <DialogDescription>Update entry details</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="task" className="text-foreground">
              Task <span className="text-destructive">*</span>
            </label>
            <Input
              id="task"
              className="border-border bg-background"
              {...register("task")}
            />
            {errors.task && <p className="error">{errors.task.message}</p>}
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
