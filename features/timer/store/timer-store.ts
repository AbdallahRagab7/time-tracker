import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TimeEntry, TimerState } from "@/features/shared/types";

interface TimerStore {
  timerState: TimerState;
  startTimer: (projectId: string, task: string, billable?: boolean) => void;
  stopTimer: () => void;
  resetTimer: () => void;
  updateTimerDuration: (duration: number) => void;
  updateTimerTask: (task: string) => void;
  updateTimerBillable: (billable: boolean) => void;
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      timerState: {
        isRunning: false,
        currentProjectId: null,
        currentTask: "",
        currentDuration: 0,
        billable: false,
        startedAt: null,
      },

      startTimer: (projectId, task, billable = false) =>
        set({
          timerState: {
            isRunning: true,
            currentProjectId: projectId,
            currentTask: task,
            currentDuration: 0,
            billable,
            startedAt: new Date().toISOString(),
          },
        }),

      stopTimer: () => {
        const { timerState } = get();
        if (
          timerState.isRunning &&
          timerState.startedAt &&
          timerState.currentProjectId
        ) {
          const startTime = new Date(timerState.startedAt);
          const endTime = new Date();
          const duration = Math.floor(
            (endTime.getTime() - startTime.getTime()) / 1000
          );

          const entry: TimeEntry = {
            id: `entry_${Date.now()}_${Math.random()
              .toString(36)
              .substr(2, 9)}`,
            projectId: timerState.currentProjectId,
            task: timerState.currentTask,
            startTime: timerState.startedAt,
            endTime: endTime.toISOString(),
            duration,
            billable: timerState.billable,
            tags: [],
            notes: "",
            date: new Date().toISOString().split("T")[0],
            createdAt: new Date().toISOString(),
          };

          import("@/features/entries/store/entries-store").then(
            ({ useEntriesStore }) => {
              useEntriesStore.getState().addEntry(entry);
            }
          );

          set((state) => ({
            timerState: {
              isRunning: false,
              currentProjectId: null,
              currentTask: "",
              currentDuration: 0,
              billable: false,
              startedAt: null,
            },
          }));
        }
      },

      resetTimer: () =>
        set({
          timerState: {
            isRunning: false,
            currentProjectId: null,
            currentTask: "",
            currentDuration: 0,
            billable: false,
            startedAt: null,
          },
        }),

      updateTimerDuration: (duration) =>
        set((state) => ({
          timerState: { ...state.timerState, currentDuration: duration },
        })),

      updateTimerTask: (task) =>
        set((state) => ({
          timerState: { ...state.timerState, currentTask: task },
        })),

      updateTimerBillable: (billable) =>
        set((state) => ({
          timerState: { ...state.timerState, billable },
        })),
    }),
    {
      name: "timer-store",
    }
  )
);
