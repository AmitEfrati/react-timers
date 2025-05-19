import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";
import type { TimerContextType } from "../context/TimerProvider";

export function useTimerContext(): TimerContextType {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
}