/**
 * Seed fake data for testing purposes
 * This file populates the stores with sample projects and time entries
 */

import { useProjectStore } from "@/features/projects/store/project-store";
import { useEntriesStore } from "@/features/entries/store/entries-store";
import type { Project, TimeEntry } from "@/features/shared/types";

/**
 * Generate a random ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a date string in YYYY-MM-DD format
 */
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Seed fake projects into the project store
 */
export function seedFakeProjects(): void {
  const { addProject } = useProjectStore.getState();
  const now = new Date().toISOString();

  const projects: Project[] = [
    {
      id: generateId(),
      name: "Web Development",
      client: "Acme Corp",
      color: "#3b82f6", // blue
      hourlyRate: 75,
      currency: "USD",
      status: "active",
      createdAt: now,
    },
    {
      id: generateId(),
      name: "Mobile App",
      client: "TechStart Inc",
      color: "#10b981", // green
      hourlyRate: 90,
      currency: "USD",
      status: "active",
      createdAt: now,
    },
    {
      id: generateId(),
      name: "Design System",
      client: "Creative Agency",
      color: "#f59e0b", // amber
      hourlyRate: 65,
      currency: "USD",
      status: "active",
      createdAt: now,
    },
  ];

  projects.forEach((project) => {
    addProject(project);
  });

  console.log(`✅ Seeded ${projects.length} fake projects`);
}

/**
 * Seed fake time entries into the entries store
 */
export function seedFakeEntries(): void {
  const { addEntry } = useEntriesStore.getState();
  const { projects } = useProjectStore.getState();

  if (projects.length === 0) {
    console.warn("⚠️ No projects found. Please seed projects first.");
    return;
  }

  const entries: TimeEntry[] = [];
  const now = new Date().toISOString();

  // Generate entries for the last 7 days
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const entryDate = new Date();
    entryDate.setDate(entryDate.getDate() - dayOffset);
    const dateStr = formatDate(entryDate);

    // Generate 2-4 entries per day
    const entriesPerDay = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < entriesPerDay; i++) {
      // Random project
      const project = projects[Math.floor(Math.random() * projects.length)];

      // Random start time (between 9 AM and 5 PM)
      const startHour = 9 + Math.floor(Math.random() * 8);
      const startMinute = Math.floor(Math.random() * 60);
      const startTime = new Date(entryDate);
      startTime.setHours(startHour, startMinute, 0, 0);

      // Random duration (30 minutes to 4 hours)
      const durationMinutes = 30 + Math.floor(Math.random() * 210); // 30 to 240 minutes
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + durationMinutes);

      const durationSeconds = durationMinutes * 60;
      const billable = Math.random() > 0.3; // 70% billable

      const tasks = [
        "Code review",
        "Feature implementation",
        "Bug fixing",
        "UI/UX design",
        "API development",
        "Testing",
        "Documentation",
        "Meeting",
        "Refactoring",
        "Performance optimization",
      ];

      const tags = [
        ["frontend", "react"],
        ["backend", "api"],
        ["design", "ui"],
        ["testing", "qa"],
        ["documentation"],
      ];

      const entry: TimeEntry = {
        id: generateId(),
        projectId: project.id,
        task: tasks[Math.floor(Math.random() * tasks.length)],
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: durationSeconds,
        billable,
        tags: tags[Math.floor(Math.random() * tags.length)],
        notes:
          Math.random() > 0.5
            ? `Worked on ${project.name} - ${
                tasks[Math.floor(Math.random() * tasks.length)]
              }`
            : "",
        date: dateStr,
        createdAt: now,
      };

      entries.push(entry);
    }
  }

  entries.forEach((entry) => {
    addEntry(entry);
  });

  console.log(`✅ Seeded ${entries.length} fake time entries`);
}

/**
 * Check if stores already have data
 */
export function hasExistingData(): boolean {
  const { projects } = useProjectStore.getState();
  const { entries } = useEntriesStore.getState();
  return projects.length > 0 || entries.length > 0;
}

/**
 * Seed all fake data (projects and entries)
 * Only seeds if stores are empty
 */
export function seedFakeData(): void {
  if (hasExistingData()) {
    console.log("ℹ️ Data already exists. Skipping seed.");
    return;
  }

  console.log("🌱 Starting to seed fake data...");
  seedFakeProjects();
  seedFakeEntries();
  console.log("✅ Finished seeding fake data!");
}

// If running directly (e.g., in browser console), execute seeding
if (typeof window !== "undefined") {
  // Make functions available globally for easy testing
  (
    window as unknown as {
      seedFakeData: typeof seedFakeData;
      seedFakeProjects: typeof seedFakeProjects;
      seedFakeEntries: typeof seedFakeEntries;
    }
  ).seedFakeData = seedFakeData;
  (
    window as unknown as {
      seedFakeData: typeof seedFakeData;
      seedFakeProjects: typeof seedFakeProjects;
      seedFakeEntries: typeof seedFakeEntries;
    }
  ).seedFakeProjects = seedFakeProjects;
  (
    window as unknown as {
      seedFakeData: typeof seedFakeData;
      seedFakeProjects: typeof seedFakeProjects;
      seedFakeEntries: typeof seedFakeEntries;
    }
  ).seedFakeEntries = seedFakeEntries;
}
