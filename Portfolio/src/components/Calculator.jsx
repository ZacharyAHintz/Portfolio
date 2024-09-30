import { useState, useEffect } from "react";
import calculator from "../assets/calculator.png";
import styles from "../styles/Calculator.module.css";

export default function Calculator() {
  const [position, setPosition] = useState(2);
  const [isExpanded, setIsExpanded] = useState(false);
  const [canRotate, setCanRotate] = useState(true);
  const [rotation, setRotation] = useState("up");

  const toggleExpand = () => {
    if (position !== 0) return;
    setIsExpanded((prevState) => !prevState);
  };

  // Scroll lock effect based on expanded state
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  useEffect(() => {
    const handleWheel = (event) => {
      if (canRotate) {
        const direction = event.deltaY < 0 ? "up" : "down";
        setRotation(direction);

        setPosition((prevPosition) => {
          const newPosition =
            direction === "up"
              ? (prevPosition + 1) % 5
              : (prevPosition - 1 + 5) % 5;
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
        className={`${styles.calculatorContainer} 
          ${styles[`position${position}${rotation}`]} 
          ${isExpanded ? styles.expanded : ""}  ${
          position !== 0 ? styles.dimmed : ""
        }`}
      >
        <button
          className={styles.calculatorButton}
          onClick={toggleExpand}
          disabled={position !== 0}
        >
          <img
            className={styles.calculator}
            src={calculator}
            alt="calculator"
          />
        </button>
      </div>
    </div>
  );
}
