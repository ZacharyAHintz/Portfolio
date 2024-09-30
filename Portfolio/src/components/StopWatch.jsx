import { useState, useEffect } from "react";
import stopwatch from "../assets/stopwatch.jpg";
import styles from "../styles/StopWatch.module.css";

export default function StopWatch() {
  const [position, setPosition] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [canRotate, setCanRotate] = useState(true);
  const [rotation, setRotation] = useState("up");

  const toggleExpand = () => {
    if (position !== 0) return;
    setIsExpanded((prevState) => !prevState);
  };

  useEffect(() => {
    const handleWheel = (event) => {
      if (canRotate) {
        const direction = event.deltaY < 0 ? "up" : "down";
        setRotation(direction);

        setPosition((prevPosition) => {
          // Adjust position based on scroll direction
          const newPosition =
            direction === "up"
              ? (prevPosition + 1) % 5
              : (prevPosition - 1 + 5) % 5;
          console.log(position, rotation);
          return newPosition;
        });

        setCanRotate(false);
        setTimeout(() => {
          setCanRotate(true);
        }, 800);
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [canRotate]);

  return (
    <div className={styles.orbitCenter}>
      <div
        className={`${styles.stopwatchContainer} 
          ${styles[`position${position}${rotation}`]} 
          ${isExpanded ? styles.expanded : ""}`}
      >
        <button
          className={styles.stopwatchButton}
          onClick={toggleExpand}
          disabled={position !== 0}
        >
          <img className={styles.stopwatch} src={stopwatch} alt="stopwatch" />
        </button>
      </div>
    </div>
  );
}
