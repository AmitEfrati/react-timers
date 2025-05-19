import { Timer } from "./Timer";
import { useTimerContext } from "../hooks/useTimerContext";
import { useTimersListStyles } from "../styles/timersListStyle";

export function TimersList() {
  const { timers, addTimer } = useTimerContext();
  const classes = useTimersListStyles();

  return (
    <div className={classes.container}>
      <button className={classes.addButton} onClick={addTimer}>
        Add Timer
      </button>
      {timers.map((id) => (
        <Timer key={id} id={id} />
      ))}
    </div>
  );
}
