import { useState, useEffect } from "react";
import stopwatch from "../assets/stopwatch.jpg";
import styles from "../styles/StopWatch.module.css";

export default function StopWatch() {
  const [position, setPosition] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [canRotate, setCanRotate] = useState(true);
  const [rotation, setRotation] = useState("up");
  const [isHidden, setIsHidden] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [open, setOpen] = useState(false);

  const openSW = new CustomEvent("openSW");
  const closeSW = new CustomEvent("closeSW");

  const toggleExpand = () => {
    if (position !== 0) return;
    setIsExpanded((prevState) => !prevState);
    if (isExpanded) {
      window.dispatchEvent(closeSW);
    }
    if (!isExpanded) {
      window.dispatchEvent(openSW);
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
    window.addEventListener("openCalc", handleProjectOpened);
    window.addEventListener("openSR", handleProjectOpened);
    window.addEventListener("openTD", handleProjectOpened);
    window.addEventListener("openCalendar", handleProjectOpened);

    window.addEventListener("closeTD", handleProjectClosed);
    window.addEventListener("closeCalc", handleProjectClosed);
    window.addEventListener("closeSR", handleProjectClosed);
    window.addEventListener("closeTD", handleProjectClosed);
    window.addEventListener("closeCalendar", handleProjectClosed);

    return () => {
      window.removeEventListener("openTD", handleProjectOpened);
      window.removeEventListener("openCalc", handleProjectOpened);
      window.removeEventListener("openSR", handleProjectOpened);
      window.removeEventListener("openTD", handleProjectOpened);
      window.removeEventListener("openCalendar", handleProjectOpened);

      window.removeEventListener("closeTD", handleProjectClosed);
      window.removeEventListener("closeCalc", handleProjectClosed);
      window.removeEventListener("closeSR", handleProjectClosed);
      window.removeEventListener("closeTD", handleProjectClosed);
      window.removeEventListener("closeCalendar", handleProjectClosed);
    };
  }, []);

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
    window.addEventListener("openSR", handleCalendarExpanded);
    window.addEventListener("openTD", handleCalendarExpanded);
    window.addEventListener("openCalc", handleCalendarExpanded);

    window.addEventListener("closeSR", handleCloseCalendar);
    window.addEventListener("closeTD", handleCloseCalendar);
    window.addEventListener("closeCalc", handleCloseCalendar);
    window.addEventListener("closeCalendar", handleCloseCalendar);

    return () => {
      window.removeEventListener("calendarExpanded", handleCalendarExpanded);
      window.removeEventListener("closeCalendar", handleCloseCalendar);
      window.removeEventListener("closeSW", handleCloseCalendar);
      window.removeEventListener("closeSR", handleCloseCalendar);
      window.removeEventListener("closeCalc", handleCloseCalendar);
      window.removeEventListener("closeSW", handleCloseCalendar);
      window.removeEventListener("openSW", handleCalendarExpanded);
      window.removeEventListener("openSR", handleCalendarExpanded);
      window.removeEventListener("openCalc", handleCalendarExpanded);
      window.removeEventListener("openSW", handleCalendarExpanded);
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
        className={`${styles.stopwatchContainer} 
          ${styles[`position${position}${rotation}`]} 
          ${isExpanded ? styles.expanded : ""}  
          ${isHidden ? styles.hidden : position !== 0 ? styles.dimmed : ""}  
        `}
      >
        <button
          className={`${styles.stopwatchButton} ${
            isHidden ? styles.hidden : position !== 0 ? styles.dimmed : ""
          }`}
          onClick={toggleExpand}
          disabled={isButtonDisabled || position !== 0}
        >
          <img className={styles.stopwatch} src={stopwatch} alt="stopwatch" />
        </button>
      </div>
    </div>
  );
}
