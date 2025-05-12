import { useState, useEffect, useRef } from "react";
import styles from "./Timer.module.css";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
      if (audioRef.current) {
        audioRef.current.volume = 0.1;
        audioRef.current.play().catch(error => console.error("Erro ao reproduzir áudio:", error));
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const updateTime = (h, m, s) => {
    const totalSeconds = (parseInt(h, 10) || 0) * 3600 + (parseInt(m, 10) || 0) * 60 + (parseInt(s, 10) || 0);
    setInitialTime(totalSeconds);
    setTime(totalSeconds);
  };

  const handleToggleTimer = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    setTime(initialTime);
    setHours("");
    setMinutes("");
    setSeconds("");
    setIsRunning(false);
  };

  const handleTimeChange = (e, setFunction, type) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(-2);
    setFunction(value);
    updateTime(type === "hours" ? value : hours, type === "minutes" ? value : minutes, type === "seconds" ? value : seconds);
  };

  const progressPercentage = initialTime ? (time / initialTime) * 100 : 0;
  const circleDashoffset = (1 - progressPercentage / 100) * 565.48;

  return (
    <div className={styles.timer}>
      <h2>Temporizador</h2>
      <div className={styles.progressContainer}>
        <svg className={styles.progressCircle} width="250" height="250" viewBox="0 0 200 200">
          <circle r="90" cx="100" cy="100" stroke="#a9ac02" strokeWidth="10" fill="transparent"></circle>
          <circle id="bar" r="90" cx="100" cy="100" stroke="#9a1eff" strokeWidth="10" fill="transparent"
            strokeDasharray="565.48"
            style={{ strokeDashoffset: circleDashoffset }}
          ></circle>
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="30" fill="#FFF">
            {`${String(Math.floor(time / 3600)).padStart(2, "0")}:${String(Math.floor((time % 3600) / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`}
          </text>
        </svg>
      </div>
      <audio ref={audioRef} src="/cabou.mp3" preload="auto"></audio>
      <div className={styles.inputs}>
        <input type="text" value={hours} onChange={(e) => handleTimeChange(e, setHours, "hours")} placeholder="HH" maxLength="2" />
        <span>:</span>
        <input type="text" value={minutes} onChange={(e) => handleTimeChange(e, setMinutes, "minutes")} placeholder="MM" maxLength="2" />
        <span>:</span>
        <input type="text" value={seconds} onChange={(e) => handleTimeChange(e, setSeconds, "seconds")} placeholder="SS" maxLength="2" />
      </div>
      <div className={styles.buttons}>
        <button onClick={handleToggleTimer}>{isRunning ? "Pausar" : "Iniciar"}</button>
        <button onClick={handleReset}>Resetar</button>
      </div>
    </div>
  );
};

export default Timer;