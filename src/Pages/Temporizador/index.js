import { Link } from "react-router-dom";
import styles from "./Temporizador.module.css";
import Timer from "../../components/Timer";

function Temporizador() {
  return (
    <section className={styles.container}>
      <Link to="/cronometro">
        <button className={styles.switchButton}>Modo Cronômetro</button>
      </Link>
      <Timer />
    </section>
  );
}

export default Temporizador;
