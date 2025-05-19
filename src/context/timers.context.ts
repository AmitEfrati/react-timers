import {
    useCallback,
    useEffect,
    useState,
    useRef,
  } from "react";
  import createContainer from "constate";


  type TTimer = {
    id: number;
    seconds: number;
    milliseconds: number;
    isRunning: boolean;
  };


  function useTimers() {
    const [timers, setTimers] = useState<TTimer[]>([])
    const nextTimerIdRef = useRef(1)

    useEffect(() => {
        const interval = setInterval(() => {
          setTimers((prev) =>
            prev.map((timer) => {
              if (!timer.isRunning) return timer;
    
              let newMillis = timer.milliseconds + 10;
              let newSeconds = timer.seconds;
    
              if (newMillis >= 1000) {
                newMillis = 0;
                newSeconds += 1;
              }
    
              return {
                ...timer,
                seconds: newSeconds,
                milliseconds: newMillis,
              };
            })
          );
        }, 10);
    
        return () => clearInterval(interval);
      }, []);

       
    const addTimer = useCallback(() => {
        const newTimer = {
          id: nextTimerIdRef.current,
          seconds: 0,
          milliseconds: 0,
          isRunning: false,
        };
        nextTimerIdRef.current += 1;
    
        setTimers((prev) => [...prev, newTimer]);
      }, []);
    
      const deleteTimer = useCallback((idToDelete: number) => {
        setTimers((prev) => prev.filter((timer) => timer.id !== idToDelete));
      }, []);
    
      const toggleRunning = useCallback((id: number) => {
        setTimers((prev) =>
            prev.map((timer) => 
                timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
            )
        );
      }, []);

    //   const startTimer = useCallback((id: number) => {
    //     setTimers((prev) =>
    //       prev.map((timer) =>
    //         timer.id === id ? { ...timer, isRunning: true } : timer
    //       )
    //     );
    //   }, []);
    
    //   const pauseTimer = useCallback((id: number) => {
    //     setTimers((prev) =>
    //       prev.map((timer) =>
    //         timer.id === id ? { ...timer, isRunning: false } : timer
    //       )
    //     );
    //   }, []);
    
      const resetTimer = useCallback((id: number) => {
        setTimers((prev) =>
          prev.map((timer) =>
            timer.id === id
              ? { ...timer, seconds: 0, milliseconds: 0, isRunning: false }
              : timer
          )
        );
      }, []);

      return {
        state: { timers },
        actions: { addTimer, deleteTimer, toggleRunning, resetTimer}

      }

  }

  export const [TimerProvider, useTimerContext] = createContainer(useTimers);