"use client"

// Types
interface Project {
  id: string
  name: string
  color: string
}

interface TimeEntry {
  id: string
  projectId: string
  task: string
  date: string
  startTime: string
  endTime: string
  duration: number
  billable: boolean
  notes: string
}

// Static data
const PROJECT: Project = {
  id: "proj1",
  name: "Website Redesign",
  color: "#3b82f6"
}

const TIME_ENTRY: TimeEntry = {
  id: "1",
  projectId: "proj1",
  task: "Design homepage",
  date: new Date().toISOString().split("T")[0],
  startTime: new Date().toISOString(),
  endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  duration: 7200, // 2 hours
  billable: true,
  notes: "Worked on the hero section"
}

// Helper function to format duration
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`
}

// Helper component for action buttons
const ActionButtons = () => (
  <div className="flex justify-end gap-2">
    <button
      className="text-muted-foreground hover:text-primary transition-colors opacity-50 cursor-not-allowed"
      disabled
      aria-label="Edit entry"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m13.5 6.5 4 4" />
      </svg>
    </button>
    <button
      className="text-muted-foreground hover:text-destructive transition-colors opacity-50 cursor-not-allowed"
      disabled
      aria-label="Delete entry"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    </button>
  </div>
)

// Helper component for project cell
const ProjectCell = ({ project }: { project: Project }) => (
  <div className="flex items-center gap-2">
    <div
      className="w-3 h-3 rounded-full"
      style={{ backgroundColor: project.color }}
      aria-hidden="true"
    />
    <span className="text-foreground">{project.name}</span>
  </div>
)

export function EntryCard() {
  const formattedDate = new Date(TIME_ENTRY.date).toLocaleDateString()
  const durationText = formatDuration(TIME_ENTRY.duration)

  const cells = [
    {
      content: <ProjectCell project={PROJECT} />,
      className: "",
    },
    {
      content: <span className="text-foreground">{TIME_ENTRY.task}</span>,
      className: "",
    },
    {
      content: <span className="text-muted-foreground">{formattedDate}</span>,
      className: "",
    },
    {
      content: <span className="text-muted-foreground">{durationText}</span>,
      className: "",
    },
    {
      content: TIME_ENTRY.billable ? (
        <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">Yes</span>
      ) : (
        <span className="text-muted-foreground text-xs">No</span>
      ),
      className: "",
    },
    {
      content: <ActionButtons />,
      className: "text-right",
    },
  ]

  return (
    <tr className="border-b border-border hover:bg-background/50 transition-colors">
      {cells.map((cell, index) => (
        <td key={index} className={`py-3 px-4 ${cell.className}`}>
          {cell.content}
        </td>
      ))}
    </tr>
  )
}
