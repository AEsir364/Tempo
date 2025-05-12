import { useState, useEffect, useRef } from "react";
import styles from "./Timer.module.css";

const Timer = () => {
  const [time, setTime] = useState(1500); // Tempo restante
  const [initialTime, setInitialTime] = useState(1500); // Tempo inicial definido pelo usuário
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null); // Referência para o áudio

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);

      // Toca o áudio de forma confiável ao acabar
      if (audioRef.current) {
        audioRef.current.volume = 0.1;
        audioRef.current.play().catch(error => console.error("Erro ao reproduzir áudio:", error));
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleToggleTimer = () => {
    if (!isRunning) {
      const h = parseInt(hours, 10) || 0;
      const m = parseInt(minutes, 10) || 0;
      const s = parseInt(seconds, 10) || 0;
      const totalSeconds = h * 3600 + m * 60 + s;

      if (totalSeconds > 0) {
        setInitialTime(totalSeconds);
        setTime(totalSeconds);
      }
    }
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    setTime(initialTime);
    setHours("");
    setMinutes("");
    setSeconds("");
    setIsRunning(false);
  };

  const progressPercentage = (time / initialTime) * 100;
  const circleDashoffset = (1 - progressPercentage / 100) * 565.48;

  return (
    <div className={styles.timer}>
      <h2>Temporizador</h2>

      <div className={styles.progressContainer}>
        <svg className={styles.progressCircle} width="250" height="250" viewBox="0 0 200 200">
          <circle r="90" cx="100" cy="100" stroke="#a9ac02" stroke-width="10" fill="transparent"></circle>
          <circle id="bar" r="90" cx="100" cy="100" stroke="#9a1eff" stroke-width="10" fill="transparent"
            stroke-dasharray="565.48"
            style={{ strokeDashoffset: circleDashoffset }}
          ></circle>
          {/* Texto do tempo aumentado para melhor visibilidade */}
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="30" fill="#FFF">
            {formatTime(time)}
          </text>
        </svg>
      </div>

      <audio ref={audioRef} src="/cabou.mp3" preload="auto"></audio>

      <div className={styles.inputs}>
        <input type="text" value={hours} onChange={(e) => setHours(e.target.value.replace(/[^0-9]/g, ""))} placeholder="HH" maxLength="2" />
        <span>:</span>
        <input type="text" value={minutes} onChange={(e) => setMinutes(e.target.value.replace(/[^0-9]/g, ""))} placeholder="MM" maxLength="2" />
        <span>:</span>
        <input type="text" value={seconds} onChange={(e) => setSeconds(e.target.value.replace(/[^0-9]/g, ""))} placeholder="SS" maxLength="2" />
      </div>

      <div className={styles.buttons}>
        <button onClick={handleToggleTimer} disabled={time === 0}>{isRunning ? "Pausar" : "Iniciar"}</button>
        <button onClick={handleReset}>Resetar</button>
      </div>
    </div>
  );
};

export default Timer;