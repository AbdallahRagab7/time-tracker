"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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

export function EntriesTable() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>Entries ({entries.length})</CardTitle>
        <CardDescription>Showing all time entries</CardDescription>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No entries found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Project</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Task</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Duration</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Billable</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => {
                  const project = projects.find((p) => p.id === entry.projectId)
                  const hours = Math.floor(entry.duration / 3600)
                  const minutes = Math.floor((entry.duration % 3600) / 60)
                  const date = new Date(entry.date).toLocaleDateString()

                  return (
                    <tr key={entry.id} className="border-b border-border hover:bg-background/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project?.color }} />
                          <span className="text-foreground">{project?.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-foreground">{entry.task}</td>
                      <td className="py-3 px-4 text-muted-foreground">{date}</td>
                      <td className="py-3 px-4 text-foreground font-mono">
                        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
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
                          <button
                            className="text-muted-foreground hover:text-primary transition-colors opacity-50 cursor-not-allowed"
                            disabled
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                              <path d="m13.5 6.5 4 4" />
                            </svg>
                          </button>
                          <button
                            className="text-muted-foreground hover:text-destructive transition-colors opacity-50 cursor-not-allowed"
                            disabled
                          >
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
  )
}
