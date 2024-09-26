import { useState } from "react";
import stopwatch from "../assets/stopwatch.jpg";
import styles from "../styles/StopWatch.module.css";

export default function StopWatch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const myEvent = new Event("click");

  const toggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    document.dispatchEvent(myEvent);
  };

  return (
    <div
      className={`${styles.stopwatchContainer} ${
        isExpanded ? styles.expanded : ""
      }`}
    >
      <button className={styles.stopwatchButton} onClick={toggleExpand}>
        <img className={styles.stopwatch} src={stopwatch} alt="stopwatch" />
      </button>
    </div>
  );
}
