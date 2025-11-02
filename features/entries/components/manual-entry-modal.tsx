"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Static data
const projects = [
  { id: "proj1", name: "Website Redesign", color: "#3b82f6" },
  { id: "proj2", name: "Mobile App", color: "#10b981" },
  { id: "proj3", name: "Marketing", color: "#8b5cf6" }
]

export function ManualEntryModal() {
  // Static form data
  const formData = {
    projectId: "proj1",
    task: "Design homepage",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "11:00",
    billable: true,
    notes: "Working on the hero section"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <Dialog open={false} onOpenChange={() => {}}>
      <DialogContent className="border-border bg-card">
        <DialogHeader>
          <DialogTitle>Add Time Entry</DialogTitle>
          <DialogDescription>Manually add a time entry</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="projectId" className="text-foreground">
              Project <span className="text-destructive">*</span>
            </Label>
            <Select disabled value={formData.projectId}>
              <SelectTrigger id="projectId" className="border-border bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {projects.map((p) => (
                  <div key={p.id} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                    <SelectItem value={p.id}>
                      {p.name}
                    </SelectItem>
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="task" className="text-foreground">
              Task <span className="text-destructive">*</span>
            </Label>
            <Input
              id="task"
              value={formData.task}
              placeholder="What did you work on?"
              className="border-border bg-background"
              disabled
            />
          </div>

          <div>
            <Label htmlFor="date" className="text-foreground">
              Date <span className="text-destructive">*</span>
            </Label>
            <Input 
              id="date" 
              type="date" 
              value={formData.date}
              className="border-border bg-background" 
              disabled
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime" className="text-foreground">
                Start Time <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="startTime" 
                type="time" 
                value={formData.startTime}
                className="border-border bg-background" 
                disabled
              />
            </div>

            <div>
              <Label htmlFor="endTime" className="text-foreground">
                End Time <span className="text-destructive">*</span>
              </Label>
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
            <Label htmlFor="notes" className="text-foreground">
              Notes
            </Label>
            <Input
              id="notes"
              placeholder="Add any notes..."
              className="border-border bg-background"
              value={formData.notes}
              disabled
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="billable"
              checked={formData.billable}
              disabled
            />
            <Label htmlFor="billable" className="text-foreground cursor-pointer">
              Billable Hours
            </Label>
          </div>

          <div className="flex gap-3 justify-end">
            <Button onClick={() => {}} variant="outline" disabled>
              Cancel
            </Button>
            <Button type="submit" disabled>
              Add Entry
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
