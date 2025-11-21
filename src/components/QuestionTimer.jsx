import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);
  useEffect(() => {
    const frequency = 100;
    const interval = setInterval(() => {
      setRemainingTime((prevTimer) => prevTimer - frequency);
    }, frequency);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <progress
      id="question-timer"
      max={timeout}
      value={remainingTime}
    ></progress>
  );
}
