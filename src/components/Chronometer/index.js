import { useState, useEffect } from "react";
import styles from "./Chronometer.module.css";

const Chronometer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className={styles.chronometer}>
      <h2>Cronômetro</h2>
      <h1>{new Date(time * 1000).toISOString().substr(11, 8)}</h1>
      <div className={styles.buttons}>
        <button onClick={handleStartStop}>{isRunning ? "Pausar" : "Iniciar"}</button>
        <button onClick={handleReset}>Resetar</button>
      </div>
    </div>
  );
};

export default Chronometer;
