import { useState, useEffect } from "react";
import styles from "../styles/CalendarText.module.css";

export default function CalendarText() {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleCloseCalendar = () => {
      setIsClosing(true);
    };

    window.addEventListener("closeCalendar", handleCloseCalendar);

    return () => {
      window.removeEventListener("closeCalendar", handleCloseCalendar);
    };
  }, []);

  return (
    <div className={`${styles.container} ${isClosing ? styles.slideOut : ""}`}>
      <h1 className={styles.title}>Calendar</h1>
      <h2 className={styles.link}>
        <a
          href="https://zacharyahintz.github.io/Calendar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://zacharyahintz.github.io/Calendar/
        </a>
      </h2>
      <h3 className={styles.subtitle}>
        A comprehensive tool for managing your events and schedules.
      </h3>
      <h3 className={styles.subtitle}>
        I learned how to manage the component state and sync up user actions
        with custom events, making everything run smoothly. I also got better at
        working with layouts and making the calendar adjust nicely to different
        screen sizes.
      </h3>
    </div>
  );
}
