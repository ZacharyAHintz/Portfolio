import { useState, useEffect } from "react";
import todo from "../assets/to-doList.jpg";
import styles from "../styles/Todo.module.css";

export default function Todo() {
  const [position, setPosition] = useState(3);
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
        className={`${styles.todoContainer} 
          ${styles[`position${position}${rotation}`]} 
          ${isExpanded ? styles.expanded : ""}  ${
          position !== 0 ? styles.dimmed : ""
        }`}
      >
        <button
          className={styles.todoButton}
          onClick={toggleExpand}
          disabled={position !== 0}
        >
          <img className={styles.todo} src={todo} alt="todo" />
        </button>
      </div>
    </div>
  );
}
