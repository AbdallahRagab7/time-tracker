import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TimeEntry, DateRange } from "@/features/shared/types";

interface EntriesStore {
  entries: TimeEntry[];
  addEntry: (entry: TimeEntry) => void;
  updateEntry: (id: string, updates: Partial<TimeEntry>) => void;
  deleteEntry: (id: string) => void;
  getEntriesByDate: (date: string) => TimeEntry[];
  getEntriesByDateRange: (range: DateRange) => TimeEntry[];
}

export const useEntriesStore = create<EntriesStore>()(
  persist(
    (set, get) => ({
      entries: [],

      addEntry: (entry) =>
        set((state) => ({
          entries: [...state.entries, entry],
        })),

      updateEntry: (id, updates) =>
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === id ? { ...e, ...updates } : e
          ),
        })),

      deleteEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        })),

      getEntriesByDate: (date) =>
        get()
          .entries.filter((e) => e.date === date)
          .sort(
            (a, b) =>
              new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
          ),

      getEntriesByDateRange: (range) => {
        const { from, to } = range;
        return get()
          .entries.filter((e) => e.date >= from && e.date <= to)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
      },
    }),
    {
      name: "entries-store",
    }
  )
);
