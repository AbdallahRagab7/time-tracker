"use client";

import { create } from "zustand";
import type { DateRange } from "@/features/shared/types";
import { useEntriesStore } from "@/features/entries/store/entries-store";
import { useProjectStore } from "@/features/projects/store/project-store";

interface StatsStore {
  getTodaysStats: () => {
    totalTime: number;
    billableTime: number;
    entryCount: number;
    byProject: Record<string, number>;
  };
  getReportData: (range: DateRange) => any;
}

export const useStatsStore = create<StatsStore>()((set, get) => ({
  getTodaysStats: () => {
    const today = new Date().toISOString().split("T")[0];
    const todaysEntries = useEntriesStore.getState().getEntriesByDate(today);

    const totalTime = todaysEntries.reduce(
      (sum: number, e: any) => sum + e.duration,
      0
    );
    const billableTime = todaysEntries
      .filter((e: any) => e.billable)
      .reduce((sum: number, e: any) => sum + e.duration, 0);

    const byProject: Record<string, number> = {};
    todaysEntries.forEach((e: any) => {
      byProject[e.projectId] = (byProject[e.projectId] || 0) + e.duration;
    });

    return {
      totalTime,
      billableTime,
      entryCount: todaysEntries.length,
      byProject,
    };
  },

  getReportData: (range) => {
    const entries = useEntriesStore.getState().getEntriesByDateRange(range);
    const projects = useProjectStore.getState().projects;

    const totalTime = entries.reduce(
      (sum: number, e: any) => sum + e.duration,
      0
    );
    const billableTime = entries
      .filter((e: any) => e.billable)
      .reduce((sum: number, e: any) => sum + e.duration, 0);

    const timeByProject: Record<string, { time: number; color: string }> = {};
    entries.forEach((e: any) => {
      const project = projects.find((p: any) => p.id === e.projectId);
      if (project) {
        if (!timeByProject[project.id]) {
          timeByProject[project.id] = { time: 0, color: project.color };
        }
        timeByProject[project.id].time += e.duration;
      }
    });

    const timeByProjectArray = Object.entries(timeByProject).map(
      ([projectId, { time, color }]) => {
        const project = projects.find((p: any) => p.id === projectId);
        return {
          name: project?.name || "Unknown",
          value: Math.round((time / 3600) * 100) / 100,
          color,
        };
      }
    );

    const dailyTrend: Record<string, number> = {};
    entries.forEach((e: any) => {
      if (!dailyTrend[e.date]) {
        dailyTrend[e.date] = 0;
      }
      dailyTrend[e.date] += e.duration;
    });

    const dailyTrendArray = Object.entries(dailyTrend)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, seconds]) => ({
        date,
        hours: Math.round((seconds / 3600) * 100) / 100,
      }));

    const earnings = entries
      .filter((e: any) => e.billable)
      .reduce((sum: number, e: any) => {
        const project = projects.find((p: any) => p.id === e.projectId);
        if (project) {
          sum += (e.duration / 3600) * project.hourlyRate;
        }
        return sum;
      }, 0);

    const days = new Set(entries.map((e: any) => e.date)).size || 1;
    const averagePerDay = Math.round((totalTime / days / 3600) * 100) / 100;

    return {
      totalTime: Math.round((totalTime / 3600) * 100) / 100,
      billableTime: Math.round((billableTime / 3600) * 100) / 100,
      earnings: Math.round(earnings * 100) / 100,
      averagePerDay,
      timeByProject: timeByProjectArray,
      dailyTrend: dailyTrendArray,
    };
  },
}));
