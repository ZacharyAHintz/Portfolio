import { useState, useEffect, useRef } from "react";
import stopwatch from "../assets/stopwatch.jpg";
import styles from "../styles/StopWatch.module.css";

export default function StopWatch() {
  const [rotation, setRotation] = useState(180);
  const [isExpanded, setIsExpanded] = useState(false);
  const myEvent = new Event("click");
  const canRotateRef = useRef(true);
  const rotationTimeoutRef = useRef(null);

  const toggleExpand = () => {
    if (rotation % 360 !== 180) return;

    const newState = !isExpanded;
    setIsExpanded(newState);
    document.dispatchEvent(myEvent);
  };

  const handleWheel = (event) => {
    if (canRotateRef.current) {
      canRotateRef.current = false;

      setRotation((prevRotation) => {
        const newRotation = prevRotation + (event.deltaY < 0 ? 72 : -72);
        return newRotation;
      });

      clearTimeout(rotationTimeoutRef.current);
      rotationTimeoutRef.current = setTimeout(() => {
        canRotateRef.current = true;
      }, 800);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(rotationTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (rotation % 360 === 180) {
      canRotateRef.current = true;
    }
  }, [rotation]);

  const opacity = rotation % 360 === 180 ? 1 : 0.5;

  return (
    <div
      className={`${styles.stopwatchContainer} ${
        isExpanded ? styles.expanded : ""
      }`}
      style={{
        opacity,
        transform: `rotate(${rotation}deg) rotate(-${rotation}deg)`,
        transition: "transform 0.8s ease-in-out, opacity 0.3s ease-in-out",
      }}
    >
      <button
        className={styles.stopwatchButton}
        onClick={toggleExpand}
        disabled={rotation % 360 !== 180}
        style={{
          opacity,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <img className={styles.stopwatch} src={stopwatch} alt="stopwatch" />
      </button>
    </div>
  );
}
