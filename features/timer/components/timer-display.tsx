"use client";

import React from "react";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: '700', // Using bold weight for better visibility
  display: 'swap',
});

export function TimerDisplay() {
  // Fake data for UI preview only
  const isRunning = true; // toggle between true/false to test styles
  const formatted = "01:23:45"; // static time

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${robotoMono.className} text-6xl font-bold tracking-tighter ${isRunning ? "text-primary" : "text-foreground"
          }`}
        style={{
          fontVariantNumeric: 'tabular-nums',
          fontFeatureSettings: '\"tnum\"',
        }}
      >
        {formatted}
      </div>
      {isRunning && (
        <div className="animate-pulse text-sm text-primary">● Recording...</div>
      )}
    </div>
  );
}
