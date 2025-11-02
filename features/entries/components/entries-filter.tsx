"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

// Static data
const projects = [
  { id: "proj1", name: "Website Redesign", color: "#3b82f6" },
  { id: "proj2", name: "Mobile App", color: "#10b981" },
  { id: "proj3", name: "Marketing", color: "#8b5cf6" }
]

export function EntriesFilter() {
  // Static values
  const today = new Date().toISOString().split("T")[0]
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

  return (
    <Card className="border-border bg-card mb-6">
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-5">
          <div>
            <label className="text-sm text-muted-foreground block mb-2">Search Task</label>
            <Input disabled placeholder="Search..." />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">From Date</label>
            <Input type="date" value={sevenDaysAgo} disabled />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">To Date</label>
            <Input type="date" value={today} disabled />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">Project</label>
            <Select disabled>
              <SelectTrigger className="border-border bg-background">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="proj1">Website Redesign</SelectItem>
                <SelectItem value="proj2">Mobile App</SelectItem>
                <SelectItem value="proj3">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">Sort By</label>
            <Select disabled>
              <SelectTrigger className="border-border bg-background">
                <SelectValue placeholder="Date" />
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
  )
}
