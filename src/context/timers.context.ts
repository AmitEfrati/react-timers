import {
    useCallback,
    useState,
    useRef,
  } from "react";
  import createContext from "constate";


  export type TTimer = {
        id: number;
        seconds: number;
        milliseconds: number;
        isRunning: boolean;
        lastUpdate?: number;
  };


  function useTimers() {
    const [timers, setTimers] = useState<TTimer[]>([])
    const nextTimerIdRef = useRef(1)

    const getTimerIndexById = useCallback((timers: TTimer[], id: number): number => {
        return timers.findIndex((timer) => timer.id === id)
    },[]);

    const addTimer = useCallback(() => {
        const newTimer: TTimer = {
          id: nextTimerIdRef.current,
          seconds: 0,
          milliseconds: 0,
          isRunning: false,
          lastUpdate: undefined
        }
        nextTimerIdRef.current += 1;
    
        setTimers((prev) => [...prev, newTimer])
      }, []);
    
      const deleteTimer = useCallback((idToDelete: number) => {
        setTimers((prev) => {
            const index = getTimerIndexById(prev, idToDelete);
            if(index === -1) return prev;

            const updated = [...prev]
            updated.splice(index, 1);
            return updated;
        })
      }, []);
    
      const toggleRunning = useCallback((id: number) => {
        setTimers((prev) => {
            const index = getTimerIndexById(prev, id);
            if(index === -1) return prev;

            const updated = [...prev]
            const timer = updated[index]

    
            updated[index] = {
                ...timer,
                isRunning: !timer.isRunning,
                lastUpdate: !timer.isRunning ? Date.now() : timer.lastUpdate,
            }
            return updated;
      });
      }, []);
    
      const resetTimer = useCallback((id: number) => {
        setTimers((prev) => {
            const index = getTimerIndexById(prev, id);
            if(index === -1) return prev;

            const updated = [...prev]
            updated[index] = {
                ...updated[index],
                seconds: 0,
                milliseconds: 0,
                isRunning: false,
                lastUpdate: undefined,
            }
            return updated;
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