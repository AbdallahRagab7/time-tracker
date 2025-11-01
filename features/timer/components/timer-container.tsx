"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { label } from "@/components/ui/label";
import { TimerDisplay } from "./timer-display";
import { Play, Square, RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"; // assuming you have one

export function TimerContainer() {
  // --- Fake Data ---
  const isRunning = false; // toggle true/false to preview both states
  const selectedProject = "1";
  const task = "Design landing page";
  const billable = true;
  const projects = [
    { id: "1", name: "Project Alpha", color: "#3b82f6" },
    { id: "2", name: "Project Beta", color: "#10b981" },
    { id: "3", name: "Project Gamma", color: "#f59e0b" },
  ];

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
            {/* Timer Display */}
            <div className="flex justify-center">
              <TimerDisplay />
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              {/* Project Select */}
              <div>
                <label htmlFor="project" className="text-foreground">
                  Project
                </label>
                <Select value={selectedProject} disabled={isRunning}>
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

              {/* Task Input */}
              <div>
                <label htmlFor="task" className="text-foreground">
                  Task Description
                </label>
                <Input
                  id="task"
                  placeholder="What are you working on?"
                  value={task}
                  disabled={isRunning}
                  className="border-border bg-background text-foreground"
                />
              </div>

              {/* Billable Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="billable"
                  checked={billable}
                  disabled={isRunning}
                />
                <label
                  htmlFor="billable"
                  className="text-foreground cursor-pointer"
                >
                  Billable Hours
                </label>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex gap-3 justify-center">
              {!isRunning ? (
                <Button className="gap-2" size="lg">
                  <Play className="w-4 h-4" />
                  Start Timer
                </Button>
              ) : (
                <>
                  <Button variant="destructive" className="gap-2" size="lg">
                    <Square className="w-4 h-4" />
                    Stop Timer
                  </Button>
                  <Button
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
    </div>
  );
}
