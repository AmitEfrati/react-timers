import { createContext } from "react";
import type { TimerContextType } from "./TimerProvider";

export const TimerContext = createContext<TimerContextType | undefined>(undefined);
