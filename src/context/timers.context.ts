import {
    useCallback,
    useState,
    useRef,
  } from "react";
  import createContext from "constate";
  import { Map } from "immutable";


  export type TTimer = {
        id: number;
        seconds: number;
        milliseconds: number;
        isRunning: boolean;
        lastUpdate?: number;
  };


  function useTimers() {
    const [timers, setTimers] = useState<Map<number, TTimer>>(Map());

    const nextTimerIdRef = useRef(1)

    const addTimer = useCallback(() => {
      const id = nextTimerIdRef.current;
      const newTimer: TTimer = {
        id,
        seconds: 0,
        milliseconds: 0,
        isRunning: false,
        lastUpdate: undefined
      }
      nextTimerIdRef.current += 1;
    
      setTimers((prev) => prev.set(id, newTimer))
      }, []);
    
      const deleteTimer = useCallback((idToDelete: number) => {
        setTimers((prev) => prev.delete(idToDelete))
      }, []);
    
      const toggleRunning = useCallback((id: number) => {
        setTimers((prev) => {
          const timer = prev.get(id);
          if(!timer) return prev;

            const updated: TTimer = {
                ...timer,
                isRunning: !timer.isRunning,
                lastUpdate: !timer.isRunning ? Date.now() : timer.lastUpdate,
            }
            return prev.set(id, updated)
        });
      }, []);
    
      const resetTimer = useCallback((id: number) => {
        setTimers((prev) => {
            const timer = prev.get(id);
            if(!timer) return prev;

            const updated: TTimer = {
              ...timer,
              seconds: 0,
              milliseconds:0,
              isRunning: false,
              lastUpdate: undefined,
            };
            return prev.set(id, updated)
      });
      }, []);

      const updateTimers = useCallback((currentTime: number) => {
        setTimers((prev) => {
            return prev.map((timer) => {
                if(!timer.isRunning) return timer;

                const lastUpdate = !timer.lastUpdate ? currentTime : timer.lastUpdate;

                const timeElapsed = currentTime - lastUpdate;
                const totalMs = timer.milliseconds + timeElapsed;

                return {
                    ...timer,
                    seconds: timer.seconds + Math.floor(totalMs / 1000),
                    milliseconds: totalMs % 1000,
                    lastUpdate: currentTime,
                }
            })
        })
      },[])

      return {
        state: { timers },
        actions: { addTimer, deleteTimer, toggleRunning, resetTimer, updateTimers}

      }

  }

  export const [TimersProvider, useTimersContext] = createContext(useTimers);