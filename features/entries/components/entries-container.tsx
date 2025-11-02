"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

// Static data
const projects = [
  { id: "proj1", name: "Website Redesign", color: "#3b82f6" },
  { id: "proj2", name: "Mobile App", color: "#10b981" },
  { id: "proj3", name: "Marketing", color: "#8b5cf6" }
]

const entries = [
  {
    id: "1",
    projectId: "proj1",
    task: "Design homepage",
    date: new Date().toISOString().split("T")[0],
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    duration: 7200, // 2 hours
    billable: true,
    notes: "Worked on the hero section"
  },
  {
    id: "2",
    projectId: "proj2",
    task: "Fix login bug",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    duration: 3600, // 1 hour
    billable: true,
    notes: "Fixed authentication issue"
  }
]

export function EntriesContainer() {
  const filtered = entries
  const today = new Date().toISOString().split("T")[0]
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Time Entries</h1>
        <Button className="gap-2" disabled>
          <Plus className="w-4 h-4" />
          Add Entry
        </Button>
      </div>

      <Card className="border-border bg-card mb-6">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-5">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">Search Task</label>
              <Input
                placeholder="Search..."
                disabled
                className="border-border bg-background"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">From Date</label>
              <Input
                type="date"
                value={sevenDaysAgo}
                disabled
                className="border-border bg-background"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">To Date</label>
              <Input
                type="date"
                value={today}
                disabled
                className="border-border bg-background"
              />
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

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Entries ({filtered.length})</CardTitle>
          <CardDescription>Showing all time entries</CardDescription>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No entries found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Project", "Task", "Date", "Duration", "Billable", "Actions"].map((header) => (
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
                  {entries.map((entry) => {
                    const project = projects.find((p) => p.id === entry.projectId)
                    const date = new Date(entry.date).toLocaleDateString()
                    const hours = Math.floor(entry.duration / 3600)
                    const minutes = Math.floor((entry.duration % 3600) / 60)
                    
                    return (
                      <tr key={entry.id} className="border-b border-border hover:bg-background/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project?.color }} />
                            <span>{project?.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{entry.task}</td>
                        <td className="py-3 px-4 text-muted-foreground">{date}</td>
                        <td className="py-3 px-4 font-mono">
                          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
                        </td>
                        <td className="py-3 px-4">
                          {entry.billable ? (
                            <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">Yes</span>
                          ) : (
                            <span className="text-muted-foreground text-xs">No</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="text-muted-foreground hover:text-primary transition-colors opacity-50 cursor-not-allowed">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                <path d="m13.5 6.5 4 4" />
                              </svg>
                            </button>
                            <button className="text-muted-foreground hover:text-destructive transition-colors opacity-50 cursor-not-allowed">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18" />
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals removed - static content only */}
    </>
  )
}
