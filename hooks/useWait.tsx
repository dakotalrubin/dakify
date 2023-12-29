import { useState, useEffect } from "react";

// useWait hook accepts a value of type T and an optional delay amount
// and returns a wait time of type T
function useWait<T>(value: T, delay?: number): T {
  // Create a T variable and a setter for song fetch wait time
  // from the useState hook
  const [waitTime, setWaitTime] = useState<T>(value);

  // Set a timer with given delay or default 500 ms.
  // Call useEffect any time the given value or delay changes.
  useEffect(() => {
    const timer = setTimeout(() => {
      setWaitTime(value);
    }, (delay || 500));

    // Reset the timer on function exit
    return (() => {
      clearTimeout(timer);
    });
  }, [value, delay]);

  // Only fetch updated search results after given delay or default 500 ms
  return waitTime;
}

export default useWait;
