import { useState, useEffect } from "react";
import styles from "../styles/TDText.module.css";

export default function TDText() {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleCloseTD = () => {
      setIsClosing(true);
    };

    window.addEventListener("closeTD", handleCloseTD);

    return () => {
      window.removeEventListener("closeTD", handleCloseTD);
    };
  }, []);

  return (
    <div className={`${styles.container} ${isClosing ? styles.slideOut : ""}`}>
      <h1 className={styles.title}>To-Do List</h1>
      <h2 className={styles.link}>
        <a
          href="https://zacharyahintz.github.io/todo-project/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://zacharyahintz.github.io/todo-project/
        </a>
      </h2>
      <h3 className={styles.subtitle}>
        A user-friendly application for managing tasks and to-do items.
      </h3>
      <h3 className={styles.subtitle}>
        This project has significantly improved my skills in React and state
        management.
      </h3>
    </div>
  );
}
