import "./App.css";
import { TimersList } from "./components/TimersList";
import { TimerProvider } from "./context/TimerProvider";

export function App() {
  return (
    <TimerProvider>
      <div>
        <h1>Timers</h1>
        <TimersList />
      </div>
    </TimerProvider>
  );
}
