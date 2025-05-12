import { Link } from "react-router-dom";
import styles from "./Cronometro.module.css";
import Chronometer from "../../components/Chronometer";

function Cronometro() {
  return (
    <section className={styles.container}>
      <Link to="/">
        <button className={styles.switchButton}>Modo Temporizador</button>
      </Link>
      <Chronometer />
    </section>
  );
}

export default Cronometro;
