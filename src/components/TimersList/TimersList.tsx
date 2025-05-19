import { Timer } from "../Timer";
import { useTimerContext } from "../../context/timers.context";
import { useStyle } from "./style";

export function TimersList() {
  const {
    state: { timers },
    actions: { addTimer },
  } = useTimerContext();

  const classes = useStyle();

  return (
    <div className={classes.container}>
      <button className={classes.addButton} onClick={addTimer}>
        Add Timer
      </button>
      {timers.map((timer) => (
        <Timer
          key={timer.id}
          id={timer.id}
          seconds={timer.seconds}
          milliseconds={timer.milliseconds}
          isRunning={timer.isRunning}
        />
      ))}
    </div>
  );
}
