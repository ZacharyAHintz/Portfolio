import { useState, useEffect } from "react";
import calculator from "../assets/calculator.png";
import styles from "../styles/Calculator.module.css";

export default function Calculator() {
  const [position, setPosition] = useState(2);
  const [isExpanded, setIsExpanded] = useState(false);
  const [canRotate, setCanRotate] = useState(true);
  const [rotation, setRotation] = useState("up");
  const [isHidden, setIsHidden] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [open, setOpen] = useState(false);

  const openCalc = new CustomEvent("openCalc");
  const closeCalc = new CustomEvent("closeCalc");

  const toggleExpand = () => {
    if (position !== 0) return;
    setIsExpanded((prevState) => !prevState);
    if (isExpanded) {
      window.dispatchEvent(closeCalc);
    }
    if (!isExpanded) {
      window.dispatchEvent(openCalc);
    }
  };

  useEffect(() => {
    const handleProjectOpened = () => {
      setIsHidden(true);
      setIsButtonDisabled(true);
      setOpen(true);
    };

    const handleProjectClosed = () => {
      setIsHidden(false);
      setIsButtonDisabled(false);
      setOpen(false);
    };

    window.addEventListener("openTD", handleProjectOpened);
    window.addEventListener("openTD", handleProjectOpened);
    window.addEventListener("openSR", handleProjectOpened);
    window.addEventListener("openSW", handleProjectOpened);
    window.addEventListener("openCalendar", handleProjectOpened);

    window.addEventListener("closeTD", handleProjectClosed);
    window.addEventListener("closeTD", handleProjectClosed);
    window.addEventListener("closeSR", handleProjectClosed);
    window.addEventListener("closeSW", handleProjectClosed);
    window.addEventListener("closeCalendar", handleProjectClosed);

    return () => {
      window.removeEventListener("openTD", handleProjectOpened);
      window.removeEventListener("openTD", handleProjectOpened);
      window.removeEventListener("openSR", handleProjectOpened);
      window.removeEventListener("openSW", handleProjectOpened);
      window.removeEventListener("openCalendar", handleProjectOpened);

      window.removeEventListener("closeTD", handleProjectClosed);
      window.removeEventListener("closeTD", handleProjectClosed);
      window.removeEventListener("closeSR", handleProjectClosed);
      window.removeEventListener("closeSW", handleProjectClosed);
      window.removeEventListener("closeCalendar", handleProjectClosed);
    };
  }, []);

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
    const handleCalendarExpanded = () => {
      console.log("Calendar expanded event triggered");
      setIsHidden(true);
      setIsButtonDisabled(true);
    };

    const handleCloseCalendar = () => {
      console.log("Close calendar event triggered");
      setIsHidden(false);
      setIsButtonDisabled(false);
    };

    // Event listeners
    window.addEventListener("calendarExpanded", handleCalendarExpanded);
    window.addEventListener("openTD", handleCalendarExpanded);
    window.addEventListener("openSR", handleCalendarExpanded);
    window.addEventListener("openSW", handleCalendarExpanded);

    window.addEventListener("closeTD", handleCloseCalendar);
    window.addEventListener("closeSR", handleCloseCalendar);
    window.addEventListener("closeSW", handleCloseCalendar);
    window.addEventListener("closeCalendar", handleCloseCalendar);

    return () => {
      window.removeEventListener("calendarExpanded", handleCalendarExpanded);
      window.removeEventListener("closeCalendar", handleCloseCalendar);
      window.removeEventListener("closeSW", handleCloseCalendar);
      window.removeEventListener("closeSR", handleCloseCalendar);
      window.removeEventListener("closeCalc", handleCloseCalendar);
      window.removeEventListener("closeTD", handleCloseCalendar);
      window.removeEventListener("openSW", handleCalendarExpanded);
      window.removeEventListener("openSR", handleCalendarExpanded);
      window.removeEventListener("openCalc", handleCalendarExpanded);
      window.removeEventListener("openTD", handleCalendarExpanded);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (event) => {
      if (canRotate && !isExpanded && !open) {
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

    if (!isExpanded) {
      window.addEventListener("wheel", handleWheel);

      return () => {
        window.removeEventListener("wheel", handleWheel);
      };
    }
  }, [canRotate, isExpanded, open]);

  return (
    <div className={styles.orbitCenter}>
      <div
        className={`${styles.calculatorContainer} 
       ${styles[`position${position}${rotation}`]} 
       ${isExpanded ? styles.expanded : ""}  
       ${isHidden ? styles.hidden : position !== 0 ? styles.dimmed : ""}  
     `}
      >
        <button
          className={`${styles.calculatorButton} ${
            isHidden ? styles.hidden : position !== 0 ? styles.dimmed : ""
          }`}
          onClick={toggleExpand}
          disabled={isButtonDisabled || position !== 0}
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
