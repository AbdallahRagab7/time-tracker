"use client";

import React from "react";

export function TimerDisplay() {
  // Fake data for UI preview only
  const isRunning = true; // toggle between true/false to test styles
  const formatted = "01:23:45"; // static time

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`text-7xl font-mono font-bold ${
          isRunning ? "text-primary" : "text-foreground"
        }`}
      >
        {formatted}
      </div>
      {isRunning && (
        <div className="animate-pulse text-sm text-primary">● Recording...</div>
      )}
    </div>
  );
}
