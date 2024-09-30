import { useState, useEffect } from "react";
import cog from "../assets/file.png";
import styles from "../styles/LandingPage.module.css";
import scroll from "../assets/scroll.png";
import CalendarText from "./CalendarText";
import CalcText from "./CalcText";
import SRText from "./SRText"; // Ensure this is imported
import SWText from "./SWText";
import TDText from "./TDText";

export default function LandingPage() {
  const [rotation, setRotation] = useState(0);
  const [canRotate, setCanRotate] = useState(true);
  const [isSlidOut, setIsSlidOut] = useState(false);
  const [project, setProject] = useState("");

  function handleClose() {
    setTimeout(() => {
      setProject("");
    }, 1000);
  }

  useEffect(() => {
    const handleWheel = (event) => {
      if (canRotate) {
        if (event.deltaY < 0) {
          setRotation((prevRotation) => prevRotation + 72);
        } else {
          setRotation((prevRotation) => prevRotation - 72);
        }

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

  useEffect(() => {
    const handleButtonClick = () => {
      setIsSlidOut(!isSlidOut);
    };

    // Set up event listeners to open the respective text components
    const handleOpenCalendar = () => {
      setProject("Calendar");
      handleButtonClick();
    };

    const handleOpenCalc = () => {
      setProject("Calc");
      handleButtonClick();
    };

    const handleOpenSR = () => {
      setProject("SR");
      handleButtonClick();
    };

    const handleOpenSW = () => {
      setProject("SW");
      handleButtonClick();
    };

    const handleOpenTD = () => {
      setProject("TD");
      handleButtonClick();
    };

    // Set up event listeners to close the text components
    const handleCloseComponent = () => {
      handleClose();
      handleButtonClick();
    };

    window.addEventListener("calendarExpanded", handleOpenCalendar);
    window.addEventListener("openCalc", handleOpenCalc);
    window.addEventListener("openSR", handleOpenSR);
    window.addEventListener("openSW", handleOpenSW);
    window.addEventListener("openTD", handleOpenTD);

    window.addEventListener("closeCalc", handleCloseComponent);
    window.addEventListener("closeTD", handleCloseComponent);
    window.addEventListener("closeSR", handleCloseComponent);
    window.addEventListener("closeSW", handleCloseComponent);
    window.addEventListener("closeCalendar", handleCloseComponent);

    return () => {
      window.removeEventListener("calendarExpanded", handleOpenCalendar);
      window.removeEventListener("openCalc", handleOpenCalc);
      window.removeEventListener("openSR", handleOpenSR);
      window.removeEventListener("openSW", handleOpenSW);
      window.removeEventListener("openTD", handleOpenTD);

      window.removeEventListener("closeCalc", handleCloseComponent);
      window.removeEventListener("closeTD", handleCloseComponent);
      window.removeEventListener("closeSR", handleCloseComponent);
      window.removeEventListener("closeSW", handleCloseComponent);
      window.removeEventListener("closeCalendar", handleCloseComponent);
    };
  }, [isSlidOut]);

  // Function to determine which component to render based on `project` value
  const renderComponent = () => {
    switch (project) {
      case "Calendar":
        return <CalendarText />;
      case "Calc":
        return <CalcText />;
      case "SR":
        return <SRText />;
      case "SW":
        return <SWText />;
      case "TD":
        return <TDText />;
      default:
        return null; // No component rendered by default
    }
  };

  return (
    <div className={styles.landingPage}>
      <div className={styles.textblock}>
        {renderComponent()} {/* Render the selected project component */}
      </div>
      <div
        className={`${styles.container} ${isSlidOut ? styles.slideOut : ""}`}
      >
        <img
          className={`${styles.cog} ${isSlidOut ? styles.slideOut : ""}`}
          src={cog}
          alt="cog"
          style={{ transform: `translateY(-50%) rotate(${rotation}deg)` }}
        />
      </div>
      <img
        className={`${styles.scroll} ${isSlidOut ? styles.slideOut : ""}`}
        src={scroll}
        alt="scroll"
      />
    </div>
  );
}
