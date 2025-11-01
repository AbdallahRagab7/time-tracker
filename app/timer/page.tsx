import { TimerContainer } from "@/features/timer/components/timer-container";

export default function TimerPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <TimerContainer />
      </main>
    </div>
  );
}
