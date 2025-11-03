export interface Project {
  id: string;
  name: string;
  client: string;
  color: string;
  hourlyRate: number;
  currency: string;
  status: "active" | "archived";
  createdAt: string;
}

export interface TimeEntry {
  id: string;
  projectId: string;
  task: string;
  startTime: string;
  endTime: string;
  duration: number; // in seconds
  billable: boolean;
  tags: string[];
  notes: string;
  date: string;
  createdAt: string;
}

export interface TimerState {
  isRunning: boolean;
  currentProjectId: string | null;
  currentTask: string;
  currentDuration: number; // in seconds
  billable: boolean;
  startedAt: string | null;
}

export interface DailyStats {
  totalTime: number;
  billableTime: number;
  entryCount: number;
  byProject: Record<string, number>;
}

export interface DateRange {
  from: string;
  to: string;
}

export interface ReportData {
  totalTime: number;
  billableTime: number;
  earnings: number;
  averagePerDay: number;
  timeByProject: Array<{ name: string; value: number; color: string }>;
  dailyTrend: Array<{ date: string; hours: number }>;
}
