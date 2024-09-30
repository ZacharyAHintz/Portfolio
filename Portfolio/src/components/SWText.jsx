import { useState, useEffect } from "react";
import styles from "../styles/SWText.module.css";

export default function SWText() {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleCloseSW = () => {
      setIsClosing(true);
    };

    window.addEventListener("closeSW", handleCloseSW);

    return () => {
      window.removeEventListener("closeSW", handleCloseSW);
    };
  }, []);

  return (
    <div className={`${styles.container} ${isClosing ? styles.slideOut : ""}`}>
      <h1 className={styles.title}>StopWatch</h1>
      <h2 className={styles.link}>
        <a
          href="https://zacharyahintz.github.io/StopWatch/"
          id="yt-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://zacharyahintz.github.io/StopWatch/
        </a>
      </h2>
      <h3 className={styles.subtitle}>
        A Small project to play with some time-based logic, a few react hooks,
        and a bit of CSS.
      </h3>
    </div>
  );
}
