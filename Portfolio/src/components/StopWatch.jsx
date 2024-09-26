import { useState, useEffect, useRef } from "react";
import stopwatch from "../assets/stopwatch.jpg";
import styles from "../styles/StopWatch.module.css";

export default function StopWatch() {
  const [rotation, setRotation] = useState(180);
  const [isExpanded, setIsExpanded] = useState(false);
  const myEvent = new Event("click");
  const canRotateRef = useRef(true); // Ref to manage rotation state
  const rotationTimeoutRef = useRef(null); // Ref to hold the timeout ID

  const toggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    document.dispatchEvent(myEvent);
  };

  const handleWheel = (event) => {
    if (canRotateRef.current) {
      canRotateRef.current = false;
      console.log("Can Rotate:", canRotateRef.current);

      setRotation((prevRotation) => {
        const newRotation =
          event.deltaY < 0 ? prevRotation + 72 : prevRotation - 72;
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

  return (
    <div
      className={`${styles.stopwatchContainer} ${
        isExpanded ? styles.expanded : ""
      }`}
      style={{
        transform: `rotate(${rotation}deg) translate(500px) rotate(-${rotation}deg)`,
        transition: "transform 0.8s ease-in-out",
      }}
    >
      <button className={styles.stopwatchButton} onClick={toggleExpand}>
        <img className={styles.stopwatch} src={stopwatch} alt="stopwatch" />
      </button>
    </div>
  );
}
