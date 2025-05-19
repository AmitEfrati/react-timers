import { useEffect, useState, useCallback } from "react";
import { useTimerContext } from "../hooks/useTimerContext";
import { useTimerStyles } from "../styles/timerStyle";

type TimerProps = {
  id: number;
};

export function Timer({ id }: TimerProps) {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const { deleteTimer } = useTimerContext();
  const classes = useTimerStyles();

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = useCallback(() => {
    setIsRunning(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setSeconds(0);
  }, []);

  const handleDelete = useCallback(() => {
    deleteTimer(id);
  }, [deleteTimer, id]);

  return (
    <div className={classes.timerBox}>
      <p>
        Timer #{id}: {seconds}
      </p>
      <button className={classes.button} onClick={handleStart}>
        Start
      </button>
      <button className={classes.button} onClick={handlePause}>
        Pause
      </button>
      <button className={classes.button} onClick={handleReset}>
        Reset
      </button>
      <button className={classes.button} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
