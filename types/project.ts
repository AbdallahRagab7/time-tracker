export interface Project {
  id: string;
  name: string;
  client?: string;
  color: string;
  hourlyRate: number;
  currency: string;
  status: "active" | "archived";
  createdAt: string;
}
