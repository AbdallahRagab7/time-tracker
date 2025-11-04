"use client";

import { useEffect, useState } from "react";
import { useTimerStore } from "@/features/timer/store/timer-store";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: "700", // Using bold weight for better visibility
  display: "swap",
});

export function TimerDisplay() {
  const timerState = useTimerStore((state) => state.timerState);
  const [displaySeconds, setDisplaySeconds] = useState(0);

  useEffect(() => {
    if (!timerState.isRunning) {
      setDisplaySeconds(timerState.currentDuration);
      return;
    }

    const interval = setInterval(() => {
      if (timerState.startedAt) {
        const elapsed = Math.floor(
          (Date.now() - new Date(timerState.startedAt).getTime()) / 1000
        );
        setDisplaySeconds(timerState.currentDuration + elapsed);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.startedAt, timerState.currentDuration]);

  const hours = Math.floor(displaySeconds / 3600);
  const minutes = Math.floor((displaySeconds % 3600) / 60);
  const seconds = displaySeconds % 60;

  const formatted = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${robotoMono.className
          } text-5xl md:text-6xl font-bold tracking-tighter ${timerState.isRunning ? "text-primary" : "text-foreground"
          }`}
      >
        {formatted}
      </div>
      {timerState.isRunning && (
        <div className="animate-pulse text-sm text-primary">● Recording...</div>
      )}
    </div>
  );
}
