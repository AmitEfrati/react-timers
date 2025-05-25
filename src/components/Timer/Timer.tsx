import { useCallback } from "react";
import { useTimersContext } from "../../context/timers.context";
import { useStyle } from "./style";
import type { TTimer } from "../../context/timers.context";

type TTimerProps = {
  timer: TTimer;
};

export function Timer({ timer }: TTimerProps) {
  const { id, seconds, milliseconds, isRunning } = timer;
  const {
    actions: { deleteTimer, toggleRunning, resetTimer },
  } = useTimersContext();

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
        Timer #{id}: {seconds}s {milliseconds}
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
