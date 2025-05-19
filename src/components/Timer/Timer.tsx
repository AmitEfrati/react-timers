import { useCallback } from "react";
import { useTimerContext } from "../../context/timers.context";
import { useStyle } from "./style";

type TTimerProps = {
  id: number;
  seconds: number;
  milliseconds: number;
  isRunning: boolean;
};

export function Timer({ id, seconds, isRunning }: TTimerProps) {
  const {
    actions: { deleteTimer, toggleRunning, resetTimer },
  } = useTimerContext();

  const classes = useStyle();

  const handleToggle = useCallback(() => {
    toggleRunning(id);
  }, [id, toggleRunning]);

  const handleReset = useCallback(() => {
    resetTimer(id);
  }, [id, resetTimer]);

  const handleDelete = useCallback(() => {
    deleteTimer(id);
  }, [id, deleteTimer]);

  return (
    <div className={classes.timerBox}>
      <p>
        Timer #{id}: {seconds}s
      </p>
      <button className={classes.button} onClick={handleToggle}>
        {isRunning ? "Pause" : "Start"}
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
