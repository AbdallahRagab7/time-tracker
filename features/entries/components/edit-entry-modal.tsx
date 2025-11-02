"use client";

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

export function EditEntryModal() {
  // Static form data
  const formData = {
    task: "Design homepage",
    startTime: "09:00",
    endTime: "11:00",
    billable: true,
    notes: "Working on the hero section",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <Dialog open={false} onOpenChange={() => {}}>
      <DialogContent className="border-border bg-card">
        <DialogHeader>
          <DialogTitle>Edit Time Entry</DialogTitle>
          <DialogDescription>Edit your time entry details</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="task" className="text-foreground">
              Task <span className="text-destructive">*</span>
            </label>
            <Input
              id="task"
              value={formData.task}
              className="border-border bg-background"
              disabled
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="text-foreground">
                Start Time <span className="text-destructive">*</span>
              </label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                className="border-border bg-background"
                disabled
              />
            </div>

            <div>
              <label htmlFor="endTime" className="text-foreground">
                End Time <span className="text-destructive">*</span>
              </label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                className="border-border bg-background"
                disabled
              />
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
              value={formData.notes}
              disabled
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="billable" checked={formData.billable} disabled />
            <label
              htmlFor="billable"
              className="text-foreground cursor-pointer"
            >
              Billable Hours
            </label>
          </div>

          <div className="flex gap-3 justify-end">
            <Button onClick={() => {}} variant="outline" disabled>
              Cancel
            </Button>
            <Button type="submit" disabled>
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
