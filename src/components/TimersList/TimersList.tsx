import { Timer } from "../Timer";
import { useTimersContext } from "../../context/timers.context";
import { useStyle } from "./style";
import { useEffect } from "react";

export function TimersList() {
  const {
    state: { timers },
    actions: { addTimer, updateTimers },
  } = useTimersContext();

  const classes = useStyle();

  useEffect(() => {
    let frameId: number;

    const loop = () => {
      const now = Date.now();
      updateTimers(now);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frameId);
  }, [updateTimers]);

  return (
    <div className={classes.container}>
      <button className={classes.addButton} onClick={addTimer}>
        Add Timer
      </button>
      {timers
        .valueSeq()
        .toArray()
        .map((timer) => (
          <Timer key={timer.id} timer={timer} />
        ))}
    </div>
  );
}
