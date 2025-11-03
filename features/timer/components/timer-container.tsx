"use client";

import { useState, useEffect } from "react";
import { useTimerStore } from "../store/timer-store";
import { useProjectStore } from "@/features/projects/store/project-store";
import { useStatsStore } from "@/features/reports/store/stats-store";
import { TimerDisplay } from "./timer-display";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Play, Square, RotateCcw } from "lucide-react";
import { TodaySummary } from "./today-summary";
import { RecentEntries } from "./recent-entries";

export function TimerContainer() {
  const {
    timerState,
    startTimer,
    stopTimer,
    resetTimer,
    updateTimerTask,
    updateTimerBillable,
  } = useTimerStore();
  const { projects } = useProjectStore();
  const { getTodaysStats } = useStatsStore();

  const [task, setTask] = useState("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [billable, setBillable] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStart = () => {
    if (selectedProject && task.trim()) {
      startTimer(selectedProject, task, billable);
    }
  };

  const handleStop = () => {
    stopTimer();
    setTask("");
    setSelectedProject("");
  };

  if (!mounted) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Timer Section */}
      <div className="lg:col-span-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Time Tracker</CardTitle>
            <CardDescription>Start or stop your timer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex justify-center">
              <TimerDisplay />
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="project" className="text-foreground">
                  Project
                </Label>
                <Select
                  value={selectedProject}
                  onValueChange={setSelectedProject}
                  disabled={timerState.isRunning}
                >
                  <SelectTrigger
                    id="project"
                    className="border-border bg-background text-foreground"
                  >
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: project.color }}
                          />
                          {project.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="task" className="text-foreground">
                  Task Description
                </Label>
                <Input
                  id="task"
                  placeholder="What are you working on?"
                  value={timerState.isRunning ? timerState.currentTask : task}
                  onChange={(e) => {
                    if (timerState.isRunning) {
                      updateTimerTask(e.target.value);
                    } else {
                      setTask(e.target.value);
                    }
                  }}
                  disabled={timerState.isRunning}
                  className="border-border bg-background text-foreground"
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="billable"
                  checked={
                    timerState.isRunning ? timerState.billable : billable
                  }
                  onCheckedChange={(checked) => {
                    if (timerState.isRunning) {
                      updateTimerBillable(checked as boolean);
                    } else {
                      setBillable(checked as boolean);
                    }
                  }}
                  disabled={timerState.isRunning}
                />
                <Label
                  htmlFor="billable"
                  className="text-foreground cursor-pointer"
                >
                  Billable Hours
                </Label>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              {!timerState.isRunning ? (
                <Button
                  onClick={handleStart}
                  disabled={!selectedProject || !task.trim()}
                  className="gap-2"
                  size="lg"
                >
                  <Play className="w-4 h-4" />
                  Start Timer
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleStop}
                    variant="destructive"
                    className="gap-2"
                    size="lg"
                  >
                    <Square className="w-4 h-4" />
                    Stop Timer
                  </Button>
                  <Button
                    onClick={resetTimer}
                    variant="outline"
                    className="gap-2 bg-transparent"
                    size="lg"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <TodaySummary />
      </div>

      <div className="lg:col-span-3">
        <RecentEntries />
      </div>
    </div>
  );
}
