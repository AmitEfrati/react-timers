import { useCallback, useMemo, useState, type ReactNode } from "react";
import { TimerContext } from "./TimerContext";

export type TimerContextType = {
  timers: number[];
  addTimer: () => void;
  deleteTimer: (id: number) => void;
};

type TimerProviderProps = {
  children: ReactNode;
};

export function TimerProvider({ children }: TimerProviderProps) {
  const [timers, setTimers] = useState<number[]>([1, 2, 3]);
  const [nextTimerId, setNextTimerId] = useState<number>(4);

  const addTimer = useCallback(() => {
    setTimers((prev) => [...prev, nextTimerId]);
    setNextTimerId((id) => id + 1);
  }, [nextTimerId]);

  const deleteTimer = useCallback((idToDelete: number) => {
    setTimers((prev) => prev.filter((id) => id !== idToDelete));
  }, []);

  const value = useMemo(() => {
    return {
      timers,
      addTimer,
      deleteTimer,
    };
  }, [timers, addTimer, deleteTimer]);

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}
