import { useState, useEffect } from "react";
import styles from "./Timer.module.css";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStart = () => {
    if (!isRunning && time > 0) setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setTime(0);
    setHours("");
    setMinutes("");
    setSeconds("");
    setIsRunning(false);
  };

  const handleSetTimer = () => {
    const h = parseInt(hours, 10) || 0;
    const m = parseInt(minutes, 10) || 0;
    const s = parseInt(seconds, 10) || 0;

    const totalSeconds = h * 3600 + m * 60 + s;
    if (totalSeconds > 0) {
      setTime(totalSeconds);
      setIsRunning(false);
    }
  };

  return (
    <div className={styles.timer}>
      <h2>Temporizador</h2>
      <h1>{new Date(time * 1000).toISOString().substr(11, 8)}</h1>

      <div className={styles.inputs}>
        <input
          type="text"
          value={hours}
          onChange={(e) => setHours(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="HH"
          maxLength="2"
        />
        <span>:</span>
        <input
          type="text"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="MM"
          maxLength="2"
        />
        <span>:</span>
        <input
          type="text"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="SS"
          maxLength="2"
        />
      </div>

      <button onClick={handleSetTimer}>Definir Tempo</button>

      <div className={styles.buttons}>
        <button onClick={handleStart} disabled={isRunning || time === 0}>
          Iniciar
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          Pausar
        </button>
        <button onClick={handleReset}>Resetar</button>
      </div>
    </div>
  );
};

export default Timer;
