import "./App.css";
import { TimersList } from "./components/TimersList";
import { TimersProvider } from "./context/timers.context";

export function App() {
  return (
    <TimersProvider>
      <div>
        <h1>Timers</h1>
        <TimersList />
      </div>
    </TimersProvider>
  );
}
