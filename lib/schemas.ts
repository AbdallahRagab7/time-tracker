import { z } from "zod";

// Manual Entry validation schema
export const manualEntrySchema = z
  .object({
    projectId: z.string().min(1, "Project is required"),
    task: z
      .string()
      .min(1, "Task description is required")
      .min(3, "Task must be at least 3 characters"),
    date: z.string().min(1, "Date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    billable: z.boolean().default(true).transform(val => val ?? true),
    notes: z.string().default("").transform(val => val ?? ""),
  })
  .refine(
    (data) => {
      // Validate end time is after start time
      const startDateTime = new Date(`${data.date}T${data.startTime}`);
      const endDateTime = new Date(`${data.date}T${data.endTime}`);
      return endDateTime > startDateTime;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

export type ManualEntryFormData = z.infer<typeof manualEntrySchema>;

// Edit Entry validation schema
export const editEntrySchema = z
  .object({
    task: z
      .string()
      .min(1, "Task description is required")
      .min(3, "Task must be at least 3 characters"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    billable: z.boolean(),
    notes: z.preprocess((val) => val ?? "", z.string()),
  })
  .refine(
    (data) => {
      // Validate end time is after start time
      const startDateTime = new Date(`2024-01-01T${data.startTime}`);
      const endDateTime = new Date(`2024-01-01T${data.endTime}`);
      return endDateTime > startDateTime;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

export type EditEntryFormData = z.infer<typeof editEntrySchema>;
