import styles from "../styles/Projects.module.css";
import Calculator from "./Calculator";
import Calendar from "./Calendar";
import Shadowrun from "./Shadowrun";
import StopWatch from "./StopWatch";
import Todo from "./Todo";
export default function Projects() {
  return (
    <div className={styles.projects}>
      <StopWatch />
      <Shadowrun />
      <Calculator />
      <Todo />
      <Calendar />
    </div>
  );
}
