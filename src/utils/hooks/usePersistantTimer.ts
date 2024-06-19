import { useState, useEffect } from "react";
import { useTimer } from "@gabrielyotoo/react-use-timer";

const usePersistentTimer = (initialTime = 60) => {
  const [finished, setFinished] = useState(false);
  const { currentTime, isRunning, start } = useTimer(initialTime, {
    onFinish: () => {
      setFinished(true);
    },
  });

  useEffect(() => {
    const storedEndTime = localStorage.getItem("otpEndTime");
    if (storedEndTime) {
      const endTime = new Date(storedEndTime).getTime();
      const now = new Date().getTime();
      const initialDuration = Math.max(0, Math.floor((endTime - now) / 1000));
      if (initialDuration > 0) {
        // Timer has remaining time, so start with the remaining time
        start();
      } else {
        // Timer has expired
        setFinished(true);
      }
    } else {
      // No stored end time, set a new end time for the timer
      const newEndTime = new Date(new Date().getTime() + initialTime * 1000);
      localStorage.setItem("otpEndTime", newEndTime.toISOString());
    }

    return () => {
      localStorage.removeItem("otpEndTime");
    };
  }, [initialTime, start]);

  const resetTimer = () => {
    const newEndTime = new Date(new Date().getTime() + initialTime * 1000);
    localStorage.setItem("otpEndTime", newEndTime.toISOString());
    start(); // Start the timer again from initialTime
    setFinished(false); // Reset finished state
  };

  return { currentTime, isRunning, finished, resetTimer };
};

export default usePersistentTimer;
